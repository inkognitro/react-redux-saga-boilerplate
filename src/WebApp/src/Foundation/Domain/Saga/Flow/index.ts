import { spawn, takeEvery, put } from "@redux-saga/core/effects";
import { logout, LogoutResult } from "Packages/Common/Authentication";
import { ResultTypes } from "Packages/Entity/CommonTypes";
import { createOpenUrl } from "Packages/Common/Router";
import { createHomeRouteUrl } from "WebApp/Routing";
import { FoundationCommandTypes } from "../../Types";

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
