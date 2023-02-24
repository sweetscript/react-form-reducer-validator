import { ValidationResolver } from 'react-form-reducer';
import { ErrorMessages, Rules } from 'validatorjs';
import { Errors } from 'react-form-reducer';
export default class Resolver<IData extends {
    [key: string]: unknown;
} | null> extends ValidationResolver<IData> {
    rules?: Rules;
    messages?: ErrorMessages;
    constructor(rules: Rules, messages?: ErrorMessages);
    validate(fields: IData, fieldsToCheck?: Array<keyof IData>): true | Errors;
}
