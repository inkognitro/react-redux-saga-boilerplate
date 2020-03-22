import {CommandHandler} from "Common/AppBase/CommandActionListener";
import {AddRoute} from "Common/Routing/Domain/Commands/AddRoute";
import {AddRedirect} from "Common/Routing/Domain/Commands/AddRedirect";
import {OpenUrl} from "Common/Routing/Domain/Commands/OpenUrl";

export class RoutingCommandHandler implements CommandHandler {
    getSupportedCommandTypes(): string[] {
        return [
            CommandTypes.ADD_ROUTE,
            CommandTypes.ADD_REDIRECT,
            CommandTypes.OPEN_URL,
        ];
    }

    handle(command: SupportedCommand): void {
        if(command.type === CommandTypes.ADD_ROUTE) {
            //todo
            return;
        }
        if(command.type === CommandTypes.ADD_REDIRECT) {
            //todo
            return;
        }
        if(command.type === CommandTypes.OPEN_URL) {
            //todo
            return;
        }
    }
}

type SupportedCommand = (AddRoute | AddRedirect | OpenUrl);

export enum CommandTypes {
    ADD_ROUTE = 'ADD_ROUTE-33ca8d0f-20f8-439e-b34f-fdd6859316c4',
    ADD_REDIRECT = 'ADD_REDIRECT-33ca8d0f-20f8-439e-b34f-fdd6859316c4',
    OPEN_URL = 'OPEN_URL-33ca8d0f-20f8-439e-b34f-fdd6859316c4',
}