import {HttpRequestDispatcher} from "Common/RequestHandling/Domain/Base/Http/HttpRequestDispatcher";
import {HttpRequest, HttpRequestResponse, HttpResponse} from "Common/RequestHandling/Domain/Base/Http/Types";
import {ReadResponseBody} from "Common/RequestHandling/Domain/ApiV1/Http/Types";

export class MockHttpRequestDispatcher implements HttpRequestDispatcher {
    executeRequest(request: HttpRequest): Promise<HttpRequestResponse> {
        console.info('MockHttpRequestDispatcher.executeRequest:');
        console.info(request);
        const response: HttpResponse<ReadResponseBody> = {
            statusCode: 200,
            body: {
                generalMessages: [],
                fieldMessages: [],
                data: {
                    "pseudoHttpOnlyCookie": "ZUwq2yWnT-H3fvpmUJwJkR3sG4aWQGMTo4tP8tNBHrc",
                    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NDcyMzkwMjIsImV4cCI6MTU4MzIzOTAyMiwic3ViIjoiMTVjZjUwZDgtYzJmYS00ZDZmLTgyMTctMjkzYWRmMzNlNTA5IiwianRpIjoiZjM2OTE4MWEtNjQ5ZS00NjRiLTliZjEtMjk1ZTNhMzI0ODc2In0",
                    "user": {
                        "id": "1f61d5cd-eedd-4edc-9b3f-ffa1b5142d6b",
                        "username": "songoku"
                    }
                }
            },
        };
        return new Promise((resolve) => {
            setTimeout(() => resolve({request, response}), 2000);
        });
    }
}