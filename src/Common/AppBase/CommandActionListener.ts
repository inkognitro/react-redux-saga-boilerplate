import {ActionListener, ListenerActionTypes} from "./ActionListener";
import {Command, CommandAction} from "Common/AppBase/CommandBus";

export interface CommandHandler {
    getSupportedCommandTypes(): string[];
    handle(command: Command): void
}

export class CommandActionListener implements ActionListener {
    private readonly commandHandlers: CommandHandler[];

    constructor(commandHandlers: CommandHandler[]) {
        this.commandHandlers = commandHandlers;
    }

    getActionTypesToListen(): string[] {
        return [ListenerActionTypes.COMMAND];
    }

    handleAction(action: CommandAction): void {
        //@ts-ignore
        const command: Command = action.command;
        this.commandHandlers.forEach((commandHandler) => {
            if(!commandHandler.getSupportedCommandTypes().includes(command.type)) {
                return;
            }
            commandHandler.handle(command);
        });
    }
}