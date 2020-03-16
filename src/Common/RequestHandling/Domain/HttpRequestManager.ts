import {Request, RequestResponse} from "Common/RequestHandling/Domain/Types";
import {CommandBus} from "Common/AppBase/CommandBus";
import {EventBus} from "Common/AppBase/EventBus";
import {createRequestWasSent} from "Common/RequestHandling/Domain/Event/RequestWasSent";
import {createResponseWasReceived} from "Common/RequestHandling/Domain/Event/ResponseWasReceived";

export function createWithHeaderEnhancedHttpRequest(request: Request, headerProperty: string, headerValue: string): Request {
    const currentHeaders = (request.headers ? request.headers : {});
    const newHeaders = Object.assign({}, currentHeaders, {[headerProperty]: headerValue});
    return Object.assign({}, request, {headers: newHeaders});
}

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
            onSuccess: (requestResponse: RequestResponse) => {
                this.eventBus.handle(createResponseWasReceived(requestResponse));
                if(settings.onSuccess) {
                    settings.onSuccess(requestResponse);
                }
            },
            onError: (requestResponse: RequestResponse) => {
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
    request: Request,
    onSuccess?(summary: RequestResponse): void,
    onError?(summary: RequestResponse): void,
};