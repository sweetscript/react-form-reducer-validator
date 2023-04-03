import { ValidationResolver, Errors } from 'react-form-reducer';
import Validator, { ErrorMessages, Rules } from 'validatorjs';

export type CustomValidationCallback = (
  fieldValue: any,
  args: any,
  attribute: any,
  data: any
) => boolean;
export type CustomValidationRule = {
  name: string;
  callback: CustomValidationCallback;
  message: string;
};

export default class Resolver<IData = any> extends ValidationResolver<IData> {
  rules?: Rules;
  messages?: ErrorMessages;
  customRules?: CustomValidationRule[];

  constructor(
    rules: Rules,
    messages?: ErrorMessages,
    customValidationRules?: CustomValidationRule[]
  ) {
    super();
    this.rules = rules;
    this.messages = messages;
    this.customRules = [
      {
        name: 'required_if',
        callback: (fieldValue, args, _, data) => {
          const isRequired = `${data[args[0]]}` === `${args[1]}`;
          return !isRequired || (fieldValue && fieldValue !== '');
        },
        message: 'The :attribute field is required'
      }
    ].concat(customValidationRules || []);

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
    if (this.customRules) {
      this.customRules.forEach((customRule) => {
        Validator.register(
          customRule.name,
          (value, args, attribute) => {
            return customRule.callback(value, args, attribute, fields);
          },
          customRule.message
        );
      });
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
