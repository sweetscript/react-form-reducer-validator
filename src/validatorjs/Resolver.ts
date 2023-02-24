import { ValidationResolver } from 'react-form-reducer';
import Validator, { ErrorMessages, Rules } from 'validatorjs';
import { Errors } from 'react-form-reducer';

export default class Resolver<
  IData extends { [key: string]: unknown } | null
> extends ValidationResolver<IData> {
  rules?: Rules;
  messages?: ErrorMessages;

  constructor(rules: Rules, messages?: ErrorMessages) {
    super();
    this.rules = rules;
    this.messages = messages;

    return this;
  }

  validate(fields: IData, fieldsToCheck?: Array<keyof IData>): true | Errors {
    let rules: { [key: string]: unknown } = this.rules || {};
    let validateFields: { [key: string]: unknown } = fields || {};
    if (fieldsToCheck) {
      validateFields = {};
      const fieldRules: { [key: string]: unknown } = {};
      fieldsToCheck.forEach((fieldKey) => {
        validateFields[fieldKey as string] = fields?.[fieldKey as string];
        if (rules[fieldKey as string]) {
          fieldRules[fieldKey as string] = rules[fieldKey as string];
        }
      });
      rules = fieldRules;
    }
    const validation = new Validator(
      validateFields,
      rules as Rules,
      this.messages
    );
    const pass = validation.passes();
    if (pass) return true;
    return validation.errors.all();
  }
}
