import {HttpRequest, HttpRequestResponse} from "Common/RequestHandling/Domain/Types";
import {CommandBus} from "Common/AppBase/CommandBus";
import {EventBus} from "Common/AppBase/EventBus";
import {createRequestWasSent} from "Common/RequestHandling/Domain/Event/HttpRequestWasSent";
import {createResponseWasReceived} from "Common/RequestHandling/Domain/Event/HttpResponseWasReceived";

export interface HttpRequestDispatcher {
    executeRequest(settings: RequestExecutionSettings): void
}

export class HttpRequestManager {
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
            onSuccess: (requestResponse: HttpRequestResponse) => {
                this.eventBus.handle(createResponseWasReceived(requestResponse));
                if(settings.onSuccess) {
                    settings.onSuccess(requestResponse);
                }
            },
            onError: (requestResponse: HttpRequestResponse) => {
                this.eventBus.handle(createResponseWasReceived(requestResponse));
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
    onSuccess?(summary: HttpRequestResponse): void,
    onError?(summary: HttpRequestResponse): void,
};