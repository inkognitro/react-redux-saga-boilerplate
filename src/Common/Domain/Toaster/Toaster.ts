import {spawn} from "@redux-saga/core/effects";
import {ToasterStateSelector} from "Common/Domain/Toaster/Types";
import {createWatchMoveMessagesFromPipelineToToastsFlow} from "Common/Domain/Toaster/Saga/Flow/MoveMessagesFromPipelineToToastsHandling";
import {createWatchRemoveMessageFlow} from "Common/Domain/Toaster/Saga/Flow/RemoveMessageHandling";
import {createWatchShowMessageFlow} from "Common/Domain/Toaster/Saga/Flow/ShowMessageHandling";

export function createToasterFlow(toasterStateSelector: ToasterStateSelector): () => Generator {
    return function* toasterFlow() {
        yield spawn(createWatchShowMessageFlow(toasterStateSelector));
        yield spawn(createWatchMoveMessagesFromPipelineToToastsFlow(toasterStateSelector));
        yield spawn(createWatchRemoveMessageFlow(toasterStateSelector));
    }
}