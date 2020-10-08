import { FieldMessage } from "packages/entity/common-types";
import { FormState } from "../types";

type StartSettings = {
    form: FormState
}

export function* startFormSubmission(_: StartSettings): Generator {
    // todo: implement!
}

type FinishSettings = {
    form: FormState
    fieldMessages: FieldMessage[]
}

export function* finishFormSubmission(_: FinishSettings): Generator {
    // todo: implement!
}
