import {
    AuthBackendService,
    ReceiveAuthDataSettings,
    ReceiveRefreshedAuthDataSettings
} from "Common/Auth/Domain/AuthBackendService";
import {
    API_ENDPOINT_URLS,
    ApiHttpRequestManager,
    createGetRequest,
    createPostRequest,
    ExecutionSummary
} from "Common/ApiV1Services/ApiHttpRequestManager";
import {getResponseBodyJson} from "Common/RequestHandling/Domain/Query";

export class ApiAuthBackendService implements AuthBackendService {
    private readonly apiHttpRequestManager: ApiHttpRequestManager;

    constructor(apiHttpRequestManager: ApiHttpRequestManager) {
        this.apiHttpRequestManager = apiHttpRequestManager;
    }

    receiveAuthData(settings: ReceiveAuthDataSettings): void {
        this.apiHttpRequestManager.executeRequest({
            request: createPostRequest({
                url: API_ENDPOINT_URLS.AUTH_AUTHENTICATE,
                body: {
                    username: settings.username,
                    password: settings.password,
                },
                isLoaderEnabled: settings.isLoaderEnabled,
            }),
            onSuccess: (summary: ExecutionSummary): void => {
                if(!settings.onSuccess) {
                    return;
                }
                // @ts-ignore
                const data = getResponseBodyJson(summary).data;
                settings.onSuccess({
                    token: data.token,
                    user: data.user,
                });
            },
            onError: (): void => {
                if(!settings.onError) {
                    return;
                }
                settings.onError();
            }
        });
    }

    receiveRefreshedAuthData(settings: ReceiveRefreshedAuthDataSettings): void {
        this.apiHttpRequestManager.executeRequest({
            apiToken: settings.apiToken,
            request: createGetRequest({
                url: API_ENDPOINT_URLS.AUTH_REFRESH,
                isLoaderEnabled: settings.isLoaderEnabled,
            }),
            onSuccess: (summary: ExecutionSummary): void => {
                if(!settings.onSuccess) {
                    return;
                }
                // @ts-ignore
                const data = getResponseBodyJson(summary).data;
                settings.onSuccess({
                    token: data.token,
                    user: data.user,
                });
            },
            onError: (): void => {
                if(!settings.onError) {
                    return;
                }
                settings.onError();
            }
        });
    }
}