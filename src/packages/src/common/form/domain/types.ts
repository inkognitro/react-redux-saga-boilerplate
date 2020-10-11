import { FormElementState } from "packages/common/form-element/domain";

export type FormElementsByNameState = {
    [name: string]: FormElementState
}

export type FormState<C = any> = {
    id: string
    isSubmitRunning: boolean
    content: C
}

export type FormElementsByNameForm<E extends FormElementsByNameState = any> = FormState<E>
