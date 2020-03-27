import {Dispatch} from "redux";
import {Command, createCommandAction} from "Common/Bootstrap/Command";

export interface CommandBus {
    handle(command: Command): void
}

export class CommandBus implements CommandBus {
    private readonly dispatch: Dispatch;

    constructor(dispatch: Dispatch) {
        this.dispatch = dispatch;
    }

    handle(command: Command): void {
        const commandAction = createCommandAction(command);
        this.dispatch(commandAction);
    }
}