import { put } from 'redux-saga/effects';
import { FieldMessage, FieldMessagePath } from "packages/common/types/util/domain";
import { setFormElementMessages } from "packages/common/form-element/domain";
import { createFormSubmitHasFinished, createFormSubmitHasStarted } from "../event";
import { FormState } from "../types";

type StartSettings = {
    form: FormState
    fieldMessagesPrefixPath: FieldMessagePath
}

export function* startFormSubmission(settings: StartSettings): Generator {
    yield put(createFormSubmitHasStarted(settings.form));
    yield setFormElementMessages({
        state: settings.form,
        fieldMessages: [],
        fieldMessagesPrefixPath: settings.fieldMessagesPrefixPath,
    });
}

type FinishSettings = {
    form: FormState
    fieldMessages: FieldMessage[]
    fieldMessagesPrefixPath: FieldMessagePath
}

export function* finishFormSubmission(settings: FinishSettings): Generator {
    yield put(createFormSubmitHasFinished(settings.form));
    yield setFormElementMessages({
        state: settings.form,
        fieldMessages: settings.fieldMessages,
        fieldMessagesPrefixPath: settings.fieldMessagesPrefixPath,
    });
}
