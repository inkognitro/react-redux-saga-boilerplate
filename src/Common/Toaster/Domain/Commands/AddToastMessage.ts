import {ToastTypes} from "Common/Toaster/Domain/Types";
import {CommandActionTypes} from "Common/Toaster/Domain/ToasterMiddleware";
import {Dispatch} from "redux";
import {createMessageWasAddedToPipeline} from "Common/Toaster/Domain/Events/MessageWasAddedToPipeline";
import {createMessageWasMovedFromPipelineToToast} from "Common/Toaster/Domain/Events/MessageWasMovedFromPipelineToToast";
import {getCommonToastIdByType} from "Common/Toaster/Domain/Query";
import {Command, createCommand} from "Common/BusMiddleware/CommandListenerMiddleware";

const waitingTimeForOtherToastMessagesInMs = 200;
export function handleAddToastMessageAction(props: AddToastMessageProps, dispatch: Dispatch): void {
    const toastId = getCommonToastIdByType(props.type);
    dispatch(createMessageWasAddedToPipeline(toastId, props.type, props.content));
    setTimeout(
        () => dispatch(createMessageWasMovedFromPipelineToToast(toastId)),
        waitingTimeForOtherToastMessagesInMs
    );
}

export function createAddToastMessageCommand(settings: CreateAddToastMessageSettings): Command<AddToastMessage> {
    return createCommand({
        type: CommandActionTypes.ADD_TOAST_MESSAGE,
        payload: settings
    });
}

type AddToastMessage = {
    type: CommandActionTypes.ADD_TOAST_MESSAGE,
    payload: CreateAddToastMessageSettings
};

type CreateAddToastMessageSettings = {
    type: ToastTypes,
    content: string,
};

type AddToastMessageProps = {
    type: ToastTypes,
    content: string,
};