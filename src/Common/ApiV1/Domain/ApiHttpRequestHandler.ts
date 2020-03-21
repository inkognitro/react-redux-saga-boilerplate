import {
    createGetRequest as generalCreateGetRequest,
    createPatchRequest as generalCreatePatchRequest,
    createPutRequest as generalCreatePutRequest,
    createPostRequest as generalCreatePostRequest,
    createDeleteRequest as generalCreateDeleteRequest,
    createWithHeaderEnhancedHttpRequest
} from "Common/RequestHandling/Domain/Command/RequestCreation";
import {
    HttpRequestHandler,
    RequestExecutionSettings as GeneralRequestExecutionSettings
} from "Common/RequestHandling/Domain/HttpRequestHandler";
import {HttpRequestResponse as GeneralHttpRequestResponse} from "Common/RequestHandling/Domain/Types";
import {BasicResponseBody} from "Common/ApiV1/Domain/Types";
import {Translator} from "Common/Translator/Domain/Translator";
import {COULD_NOT_CONNECT_TO_SERVER_TRANSLATION_ID} from "Common/Translator/Domain/Translation/en";
import {createAddToastMessage} from "Common/Toaster/Domain/Command/AddToastMessage";
import {ToastTypes} from "Common/Toaster/Domain/Types";
import {CommandBus} from "Common/AppBase/CommandBus";
import {getToastTypeByMessageType} from "Common/ApiV1/Domain/Selection";

export const createGetRequest = generalCreateGetRequest;
export const createPatchRequest = generalCreatePatchRequest;
export const createPutRequest = generalCreatePutRequest;
export const createPostRequest = generalCreatePostRequest;
export const createDeleteRequest = generalCreateDeleteRequest;

export type RequestResponse = GeneralHttpRequestResponse<BasicResponseBody>;
export type RequestExecutionSettings = (GeneralRequestExecutionSettings & {
    apiToken?: string
});

export class ApiHttpRequestHandler {
    private commandBus: CommandBus;
    private httpRequestHandler: HttpRequestHandler;
    private translator: Translator;

    constructor(
        commandBus: CommandBus,
        httpRequestHandler: HttpRequestHandler,
        translator: Translator
    ) {
        this.commandBus = commandBus;
        this.httpRequestHandler = httpRequestHandler;
        this.translator = translator;
    }

    public executeRequest(settings: RequestExecutionSettings): void {
        this.httpRequestHandler.executeRequest(this.createGeneralRequestExecutionSettings(settings));
    }

    private createGeneralRequestExecutionSettings(settings: RequestExecutionSettings): GeneralRequestExecutionSettings
    {
        let generalSettings = {
            request: (
                settings.apiToken
                    ? createWithHeaderEnhancedHttpRequest(settings.request, 'X-API-TOKEN', settings.apiToken)
                    : settings.request
            ),
            onError: (requestResponse: RequestResponse): void => {
                this.showRequestResponseMessages(requestResponse);
                if (settings.onError) {
                    settings.onError(requestResponse);
                }
            }
        };
        if (settings.onSuccess) {
            generalSettings = Object.assign({}, generalSettings, {
                onSuccess: settings.onSuccess
            });
        }
        return generalSettings;
    }

    private showRequestResponseMessages(requestResponse: RequestResponse): void {
        if (!requestResponse.response) {
            const foundTranslatedText = this.translator.findTranslatedText(COULD_NOT_CONNECT_TO_SERVER_TRANSLATION_ID);
            const content = (foundTranslatedText ? foundTranslatedText : 'Could not connect to server.');
            const command = createAddToastMessage({
                type: ToastTypes.ERROR,
                content: content
            });
            this.commandBus.handle(command);
            return;
        }
        const generalMessages = requestResponse.response.body.generalMessages;
        if(!generalMessages) {
            return;
        }
        generalMessages.forEach((message) => {
            const toastType = getToastTypeByMessageType(message.type);
            const foundTranslatedText = this.translator.findTranslatedText(message.translationId);
            const content = (foundTranslatedText ? foundTranslatedText : message.defaultText);
            const command = createAddToastMessage({
                type: toastType,
                content: content
            });
            this.commandBus.handle(command);
        });
    }
}