import { put, takeEvery } from "redux-saga/effects";
import { createShowMessage, ToastTypes } from "packages/common/toaster/domain";
import { HttpApiV1EventTypes } from "packages/common/http-api-v1/domain";
import { TranslationIds } from "packages/common/entity-base/common-types";

export function createHttpApiV1ToasterSaga(): () => Generator {
    return function* (): Generator {
        yield takeEvery(HttpApiV1EventTypes.RESPONSE_COULD_NOT_BE_RECEIVED, function* () {
            yield put(
                createShowMessage({
                    id: '419b4fa5-c552-4c85-b1cc-1121ac575c21',
                    toastType: ToastTypes.ERROR,
                    content: {
                        translationId: TranslationIds.COULD_NOT_CONNECT_TO_SERVER,
                        fallback: 'Could not connect to server.',
                    },
                }),
            );
        });
    };
}
