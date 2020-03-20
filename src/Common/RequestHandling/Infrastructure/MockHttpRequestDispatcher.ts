import {HttpRequestDispatcher, RequestExecutionSettings} from "Common/RequestHandling/Domain/HttpRequestHandler";
import {HttpRequestResponse} from "Common/RequestHandling/Domain/Types";

export class MockHttpRequestDispatcher implements HttpRequestDispatcher {
    executeRequest(settings: RequestExecutionSettings): void {
        console.info('MockHttpRequestDispatcher.executeRequest:');
        console.info(settings.request);
        setTimeout(() => {
            if (!settings.onSuccess) {
                return;
            }
            const summary: HttpRequestResponse = {
                request: settings.request,
                response: {
                    statusCode: 200,
                    body: {
                        "success": true,
                        "data": {
                            "pseudoHttpOnlyCookie": "ZUwq2yWnT-H3fvpmUJwJkR3sG4aWQGMTo4tP8tNBHrc",
                            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NDcyMzkwMjIsImV4cCI6MTU4MzIzOTAyMiwic3ViIjoiMTVjZjUwZDgtYzJmYS00ZDZmLTgyMTctMjkzYWRmMzNlNTA5IiwianRpIjoiZjM2OTE4MWEtNjQ5ZS00NjRiLTliZjEtMjk1ZTNhMzI0ODc2In0",
                            "user": {
                                "id": "1f61d5cd-eedd-4edc-9b3f-ffa1b5142d6b",
                                "username": "songoku"
                            }
                        }
                    },
                }
            };
            settings.onSuccess(summary);
        }, 2000);
    }
}