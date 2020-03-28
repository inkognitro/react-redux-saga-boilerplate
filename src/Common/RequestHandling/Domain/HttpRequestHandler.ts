import {HttpRequest, HttpRequestResponse, SuccessHttpRequestResponse} from "Common/RequestHandling/Domain/Types";
import {CommandBus} from "Common/Bootstrap/CommandBus";
import {EventBus} from "Common/Bootstrap/EventBus";
import {createRequestWasSent} from "Common/RequestHandling/Domain/Event/HttpRequestWasSent";
import {createHttpRequestWasFinished} from "Common/RequestHandling/Domain/Event/HttpRequestWasFinished";

export interface HttpRequestDispatcher {
    executeRequest(settings: RequestExecutionSettings): void
}

export class HttpRequestHandler {
    private readonly commandBus: CommandBus;
    private readonly eventBus: EventBus;
    private readonly requestDispatcher: HttpRequestDispatcher;

    constructor(
        commandBus: CommandBus,
        eventBus: EventBus,
        requestDispatcher: HttpRequestDispatcher
    ) {
        this.commandBus = commandBus;
        this.eventBus = eventBus;
        this.requestDispatcher = requestDispatcher;
    }

    executeRequest(settings: RequestExecutionSettings): void {
        const extendedSettings = Object.assign({}, settings, {
            onSuccess: (requestResponse: SuccessHttpRequestResponse) => {
                this.eventBus.handle(createHttpRequestWasFinished(requestResponse));
                if(settings.onSuccess) {
                    settings.onSuccess(requestResponse);
                }
            },
            onError: (requestResponse: HttpRequestResponse) => {
                this.eventBus.handle(createHttpRequestWasFinished(requestResponse));
                if(settings.onError) {
                    settings.onError(requestResponse);
                }
            },
        });
        this.commandBus.handle(createRequestWasSent(extendedSettings.request));
        this.requestDispatcher.executeRequest(extendedSettings);
    }
}

export type RequestExecutionSettings = {
    request: HttpRequest,
    onSuccess?(requestResponse: SuccessHttpRequestResponse): void,
    onError?(requestResponse: HttpRequestResponse): void,
};