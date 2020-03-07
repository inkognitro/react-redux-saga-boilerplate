import {ActionListener, ListenerActionTypes} from "./ActionListener";
import {Action} from "redux";

export type Command = {
    typeId: string,
    payload: object
};

export type CommandAction = (Action & {
    command: Command
});

export function createCommandAction(command: Command): CommandAction {
    return {
        type: ListenerActionTypes.COMMAND,
        command: command,
    };
}

export interface CommandHandler {
    getSupportedCommandTypeIds(): string[];
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

    handleAction(action: Action): void {
        if(action.type !== ListenerActionTypes.COMMAND) {
            return;
        }
        //@ts-ignore
        const command: Command = action.command;
        this.commandHandlers.forEach((commandHandler) => {
            if(!commandHandler.getSupportedCommandTypeIds().includes(command.typeId)) {
                return;
            }
            commandHandler.handle(command);
        });
    }
}