import { put, takeEvery } from "redux-saga/effects";
import { createShowMessage } from "Packages/Common/Toaster";
import { ToastTypes } from "Packages/Common/Toaster/Domain/Types";
import { HttpApiV1EventTypes } from "Packages/Common/HttpApiV1";
import { TranslationIds } from "Packages/Entity/CommonTypes";

export function createHttpApiV1ToasterSaga(): () => Generator {
    return function* (): Generator {
        yield takeEvery(HttpApiV1EventTypes.API_V1_HTTP_CONNECTION_FAILED, function* () {
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
