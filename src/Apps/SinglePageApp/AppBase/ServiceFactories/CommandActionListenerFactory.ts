import {ActionListener, ActionListenerFactory} from "Common/AppBase/ActionListener";
import {AppServices} from "./AppServices";
import {CommandActionListener, CommandHandler} from "Common/AppBase/CommandActionListener";
import {ToasterCommandHandler} from "Common/Toaster/Domain/Command/CommandHandler";
import {RoutingCommandHandler} from "Common/Routing/Domain/Commands/CommandHandler";

export class CommandActionListenerFactory implements ActionListenerFactory<AppServices> {
    public create(services: AppServices): ActionListener {
        return new CommandActionListener(createCommandHandlers(services));
    }
}

function createCommandHandlers(services: AppServices): CommandHandler[] {
    return [
        new ToasterCommandHandler(services.toaster),
        new RoutingCommandHandler(services.router),
    ];
}