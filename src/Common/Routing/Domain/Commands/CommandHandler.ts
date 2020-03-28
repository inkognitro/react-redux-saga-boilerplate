import {CommandHandler} from "Common/Bootstrap/CommandActionListener";
import {OpenUrl} from "Common/Routing/Domain/Commands/OpenUrl";
import {Router} from "Common/Routing/Domain/Router";
import {AddRedirect} from "Common/Routing/Domain/Commands/AddRedirect";

export class RoutingCommandHandler implements CommandHandler {
    private readonly router: Router;

    constructor(router: Router) {
        this.router = router;
    }

    getSupportedCommandTypes(): string[] {
        return [
            CommandTypes.OPEN_URL,
            CommandTypes.ADD_REDIRECT,
        ];
    }

    handle(command: SupportedCommand): void {
        if(command.type === CommandTypes.OPEN_URL) {
            this.router.openUrl(command.payload);
            return;
        }
        if(command.type === CommandTypes.ADD_REDIRECT) {
            this.router.addRedirect(command.payload.redirect);
            return;
        }
    }
}

type SupportedCommand = (OpenUrl | AddRedirect);

export enum CommandTypes {
    OPEN_URL = 'OPEN_URL-33ca8d0f-20f8-439e-b34f-fdd6859316c4',
    ADD_REDIRECT = 'ADD_REDIRECT-33ca8d0f-20f8-439e-b34f-fdd6859316c4',
}