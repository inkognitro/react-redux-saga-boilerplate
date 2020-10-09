import { ApiV1ReadResponse } from "packages/common/http-api-v1/domain";
import { MessageTypes } from "packages/entity/common-types";
import { apiV1BaseUrl } from "packages/common/http-api-v1/domain/saga/effect/execute.request";
import { HttpRequestDispatcher, Request, RequestResponse } from "../domain/types";

export class MockHttpRequestDispatcher implements HttpRequestDispatcher {
    executeRequest(request: Request): Promise<RequestResponse> {
        console.info('Request execution simulation - request', request);
        const response = createResponseByRequest(request);
        return new Promise((resolve) => {
            setTimeout(() => {
                console.info('Request execution simulation - response', response);
                resolve({ request, response });
            }, 2000);
        });
    }
}

function createResponseByRequest(request: Request): ApiV1ReadResponse {
    if (request.url === (`${apiV1BaseUrl}/auth/authenticate`)) {
        return createValidLoginResponse();
    }
    if (request.url === (`${apiV1BaseUrl}/auth/refreshauthentication`)) {
        return createValidAuthenticationRefreshResponse();
    }
    return createInvalidLoginResponse();
}

function createInvalidLoginResponse(): ApiV1ReadResponse {
    return {
        headers: {
            statusCode: 403,
        },
        body: {
            generalMessages: [
                {
                    id: '89ec424a-3700-4452-b66e-1df8080441ee',
                    type: MessageTypes.ERROR,
                    content: {
                        translationId: '38995999-20a6-4d00-9565-22e1f04133cd',
                        fallback: 'Please check your credentials!',
                    },
                },
            ],
            fieldMessages: [
                {
                    message: {
                        id: 'foo123',
                        type: MessageTypes.ERROR,
                        content: {
                            translationId: 'bar123',
                            fallback: (
                                'This is just a test error message.'
                                + ' Normally you should not provide such hints in login forms!'
                            ),
                        },
                    },
                    path: ['username'],
                },
            ],
            data: {},
        },
    };
}

const authToken = (
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9."
    + "eyJpYXQiOjE1NDcyMzkwMjIsImV4cCI6MTU4MzIzOTAyMiwic3ViIjoiMTVjZjUwZDgtYzJmYS00ZDZmL"
    + "TgyMTctMjkzYWRmMzNlNTA5IiwianRpIjoiZjM2OTE4MWEtNjQ5ZS00NjRiLTliZjEtMjk1ZTNhMzI0ODc2In0"
);

function createValidLoginResponse(): ApiV1ReadResponse {
    return {
        headers: {
            statusCode: 200,
        },
        body: {
            generalMessages: [
                {
                    id: '99ec424a-3700-4452-b66e-1df8080441ee',
                    type: MessageTypes.SUCCESS,
                    content: {
                        translationId: '3f995999-20a6-4d00-9565-22e1f04133cd',
                        fallback: 'Test message from backend: You have successfully been logged in!',
                    },
                },
            ],
            fieldMessages: [],
            data: {
                token: authToken,
                user: {
                    id: "1f61d5cd-eedd-4edc-9b3f-ffa1b5142d6b",
                    username: "Nagato (initial)",
                },
            },
        },
    };
}

function createValidAuthenticationRefreshResponse(): ApiV1ReadResponse {
    return {
        headers: {
            statusCode: 200,
        },
        body: {
            generalMessages: [],
            fieldMessages: [],
            data: {
                token: authToken,
                user: {
                    id: "1f61d5cd-eedd-4edc-9b3f-ffa1b5142d6b",
                    username: "Nagato (refreshed)",
                },
            },
        },
    };
}
