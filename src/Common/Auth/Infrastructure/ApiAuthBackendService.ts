import {
    AuthBackendService,
    ReceiveAuthDataSettings,
    ReceiveRefreshedAuthDataSettings
} from "Common/Auth/Domain/AuthBackendService";
import {
    API_ENDPOINT_URLS,
    ApiHttpRequestHandler,
    createGetRequest,
    ExecutionSummary
} from "Common/RequestHandling/Domain/ApiHttpRequestHandling";
import {getResponseBodyJson} from "Common/RequestHandling/Domain/HttpRequestHandling/Selectors";

export class ApiAuthBackendService implements AuthBackendService {
    private readonly apiHttpRequestHandler: ApiHttpRequestHandler;

    constructor(apiHttpRequestHandler: ApiHttpRequestHandler) {
        this.apiHttpRequestHandler = apiHttpRequestHandler;
    }

    receiveAuthData(settings: ReceiveAuthDataSettings): void {
        this.apiHttpRequestHandler.executeRequest({
            request: createGetRequest({
                url: API_ENDPOINT_URLS.AUTH_AUTHENTICATE,
                queryParameters: {
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
        this.apiHttpRequestHandler.executeRequest({
            apiToken: settings.apiToken,
            request: createGetRequest({
                url: API_ENDPOINT_URLS.AUTH_REFRESH_TOKEN,
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