import { FieldMessage, Message } from "Packages/Common/CommonTypes";

export enum ResultTypes {
    SUCCESS = 'success',
    ERROR = 'error',
}

export type BusinessLogicResult<Data = any> = {
    type: ResultTypes,
    generalMessages: Message[]
    fieldMessages: FieldMessage[]
    data?: Data
}

type BusinessLogicResultCreationSettings<Data> = (
    Partial<BusinessLogicResult<Data>>
    & Pick<BusinessLogicResult<Data>, 'type'>
);

export function createBusinessLogicResult<Data>(settings: BusinessLogicResultCreationSettings<Data>): BusinessLogicResult<Data> {
    return {
        type: ResultTypes.SUCCESS,
        generalMessages: [],
        fieldMessages: [],
        ...settings,
    };
}
