import {Action, Dispatch, Middleware, Store} from "redux";

export function createListenerMiddleware(configuration: ListenerMiddlewareConfiguration): Middleware {
    return function initializeMiddleware(store: Store) {
        return function initializeHandlers(next: Dispatch) {
            configuration.getActionHandlers().forEach((plugin: ActionHandlers) => plugin.onInitialize());
            return function handleAction(action: (Action | ListenerAction)) {
                if (action.type !== configuration.getActionTypeToConsider()) {
                    return next(action);
                }
                //@ts-ignore
                const actionToHandle: Action = action.listenerAction;
                configuration.getActionHandlers().forEach((plugin: ActionHandlers) => plugin.handle(actionToHandle));
                return store.getState();
            }
        }
    }
}

export class ListenerMiddlewareConfiguration {
    private readonly actionTypeToConsider: string;
    private readonly actionHandlers: ActionHandlers[];

    constructor(
        actionTypeToConsider: string,
        actionHandlers: ActionHandlers[]
    ) {
        this.actionTypeToConsider = actionTypeToConsider;
        this.actionHandlers = actionHandlers;
    }

    public getActionTypeToConsider(): string {
        return this.actionTypeToConsider;
    }

    public getActionHandlers(): ActionHandlers[] {
        return this.actionHandlers;
    }
}

export abstract class ActionHandlers {
    public onInitialize(): void {}
    public abstract handle(action: Action): void
}

export type ListenerAction = (Action & {
    listenerAction: Action
});