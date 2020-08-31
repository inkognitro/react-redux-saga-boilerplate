import { spawn, takeEvery, put } from "@redux-saga/core/effects";
import { logout, LogoutResult } from "packages/common/authentication/domain";
import { ResultTypes } from "packages/entity/common-types";
import { createOpenUrl } from "packages/common/router/domain";
import { createHomeRouteUrl } from "web-app/routing/domain";
import { FoundationCommandTypes } from "../command";

export function createFoundationSaga(): () => Generator {
    return function* (): Generator {
        yield spawn(watchLogoutCommands);
    };
}

function* watchLogoutCommands(): Generator {
    yield takeEvery(FoundationCommandTypes.LOGOUT, function* (): Generator {
        // @ts-ignore
        const result: LogoutResult = yield logout();
        if (result.type === ResultTypes.SUCCESS) {
            yield put(createOpenUrl({ url: createHomeRouteUrl() }));
        }
    });
}