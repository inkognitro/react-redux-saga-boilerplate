import {ActionListener, ActionListenerFactory} from "Common/AppBase/ActionListener";
import {AppServices} from "./AppServices";
import {CommandActionListener, CommandHandler} from "Common/AppBase/CommandActionListener";
import {ToasterCommandHandler} from "Common/Toaster/Domain/Command/CommandHandler";

export class CommandActionListenerFactory implements ActionListenerFactory<AppServices> {
    public create(services: AppServices): ActionListener {
        return new CommandActionListener(createCommandHandlers(services));
    }
}

function createCommandHandlers(services: AppServices): CommandHandler[] {
    return [
        new ToasterCommandHandler(services.toaster),
    ];
}