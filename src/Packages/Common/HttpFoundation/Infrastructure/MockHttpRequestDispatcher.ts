import {HttpRequestDispatcher, Request, RequestResponse,} from "Packages/Common/HttpFoundation";
import {ApiV1ReadResponse} from "Packages/Common/HttpApiV1";
import {MessageTypes} from "Packages/Common/CommonTypes";

export class MockHttpRequestDispatcher implements HttpRequestDispatcher {
    executeRequest(request: Request): Promise<RequestResponse> {
        console.info('Request execution simulation - request', request);
        const response: ApiV1ReadResponse = {
            statusCode: 200,
            body: {
                generalMessages: [
                    {
                        id: '99ec424a-3700-4452-b66e-1df8080441ee',
                        type: MessageTypes.INFO,
                        content: {
                            translationId: '3f995999-20a6-4d00-9565-22e1f04133cd',
                            fallback: (
                                'You have successfully been logged in.. '
                                + 'unnecessary info I know, but it is for test purposes^^'
                            ),
                        },
                    },
                ],
                fieldMessages: [],
                data: {
                    pseudoHttpOnlyCookie: "ZUwq2yWnT-H3fvpmUJwJkR3sG4aWQGMTo4tP8tNBHrc",
                    token: (
                        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9."
                        + "eyJpYXQiOjE1NDcyMzkwMjIsImV4cCI6MTU4MzIzOTAyMiwic3ViIjoiMTVjZjUwZDgtYzJmYS00ZDZmL"
                        + "TgyMTctMjkzYWRmMzNlNTA5IiwianRpIjoiZjM2OTE4MWEtNjQ5ZS00NjRiLTliZjEtMjk1ZTNhMzI0ODc2In0"
                    ),
                    user: {
                        id: "1f61d5cd-eedd-4edc-9b3f-ffa1b5142d6b",
                        username: "songoku",
                    },
                },
            },
        };
        return new Promise((resolve) => {
            setTimeout(() => {
                console.info('Request execution simulation - response', response);
                resolve({ request, response });
            }, 2000);
        });
    }
}
