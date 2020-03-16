import {AddToastMessage} from "Common/Toaster/Domain/Command/AddToastMessage";
import {CommandHandler} from "Common/AppBase/CommandActionListener";
import {BlockToastForMessageReceiving} from "Common/Toaster/Domain/Command/BlockToastForMessageReceiving";
import {RemoveToast} from "Common/Toaster/Domain/Command/RemoveToast";
import {RemoveToastMessage} from "Common/Toaster/Domain/Command/RemoveToastMessage";

export class RequestCommandHandler implements CommandHandler {
    getSupportedCommandTypes(): string[] {
        return [
            CommandTypes.SEND_HTTP_REQUEST,
        ];
    }

    handle(command: RequestCommands): void {
        if(command.type === CommandTypes.SEND_HTTP_REQUEST) {
            //todo
        }
    }
}

type RequestCommands = (AddToastMessage | BlockToastForMessageReceiving | RemoveToast | RemoveToastMessage);

export enum CommandTypes {
    SEND_HTTP_REQUEST = 'SEND_HTTP_REQUEST-639d43a1-e8dd-426d-a868-5079aa60d064',
}