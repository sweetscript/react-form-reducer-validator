import { ValidationResolver, Errors } from 'react-form-reducer';
import { ErrorMessages, Rules } from 'validatorjs';
export type CustomValidationCallback = (fieldValue: any, args: any, attribute: any, data: any) => boolean;
export type CustomValidationRule = {
    name: string;
    callback: CustomValidationCallback;
    message: string;
};
export default class Resolver<IData = any> extends ValidationResolver<IData> {
    rules?: Rules;
    messages?: ErrorMessages;
    customRules?: CustomValidationRule[];
    constructor(rules: Rules, messages?: ErrorMessages, customValidationRules?: CustomValidationRule[]);
    validate(fields: IData, fieldsToCheck?: Array<keyof IData>): true | Errors;
}
