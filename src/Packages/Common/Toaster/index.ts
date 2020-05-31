import {
    ToasterStateSelector as ToasterStateSelectorType,
    ToasterEvent as ToasterEventType,
    ToasterState as ToasterStateType,
    MessageToAdd as MessageToAddType,
    Toast as ToastType,
    Message as MessageType,
} from './Domain/Types';
import {
    DispatchToastsFromResultGenerator as DispatchToastsFromResultGeneratorType,
} from "./Domain/Saga/CustomEffect/ToastDispatching";
import { RemoveMessage as RemoveMessageType } from "./Domain/Command/RemoveMessage";
import { ShowMessage as ShowMessageType } from "./Domain/Command/ShowMessage";
import { ToastWasRemoved as ToastWasRemovedType } from "./Domain/Event/ToastWasRemoved";
import { ToastWasAdded as ToastWasAddedType } from "./Domain/Event/ToastWasAdded";
import { ToastOutroAnimationWasStarted as ToastOutroAnimationWasStartedType } from "./Domain/Event/ToastOutroAnimationWasStarted";
import {
    ToastIntroAnimationWasFinished as ToastIntroAnimationWasFinishedType,
} from "./Domain/Event/ToastIntroAnimationWasFinished";
import { MessageWasRemoved as MessageWasRemovedType } from "./Domain/Event/MessageWasRemoved";
import { MessageWasAddedToPipeline as MessageWasAddedToPipelineType } from "./Domain/Event/MessageWasAddedToPipeline";
import { MessagesWereAddedToToast as MessagesWereAddedToToastType } from "./Domain/Event/MessagesWereAddedToToast";
import {
    MessageOutroAnimationWasStarted as MessageOutroAnimationWasStartedType,
} from "./Domain/Event/MessageOutroAnimationWasStarted";
import {
    MessageIntroAnimationsWereFinished as MessageIntroAnimationsWereFinishedType,
} from "./Domain/Event/MessageIntroAnimationsWereFinished";

export type ToasterStateSelector = ToasterStateSelectorType;
export type ToasterEvent = ToasterEventType;
export type ToasterState = ToasterStateType;
export type MessageToAdd = MessageToAddType;
export type Toast = ToastType;
export type Message = MessageType;
export type DispatchToastsFromResultGenerator = DispatchToastsFromResultGeneratorType;
export type RemoveMessage = RemoveMessageType;
export type ShowMessage = ShowMessageType;
export type ToastWasRemoved = ToastWasRemovedType;
export type ToastWasAdded = ToastWasAddedType;
export type ToastOutroAnimationWasStarted = ToastOutroAnimationWasStartedType;
export type ToastIntroAnimationWasFinished = ToastIntroAnimationWasFinishedType;
export type MessageWasRemoved = MessageWasRemovedType;
export type MessageWasAddedToPipeline = MessageWasAddedToPipelineType;
export type MessagesWereAddedToToast = MessagesWereAddedToToastType;
export type MessageOutroAnimationWasStarted = MessageOutroAnimationWasStartedType;
export type MessageIntroAnimationsWereFinished = MessageIntroAnimationsWereFinishedType;

export { ToastTypes, ToasterCommandTypes, ToasterEventTypes } from './Domain/Types';
export { createToasterSaga } from "./Domain/Saga/Flow";
export { dispatchToastsFromResult } from "./Domain/Saga/CustomEffect/ToastDispatching";
export { createRemoveMessage } from "./Domain/Command/RemoveMessage";
export { createShowMessage } from "./Domain/Command/ShowMessage";
export { toasterReducer } from './Domain/Reducer';
export { ToasterWC } from './UI/ToasterWC';
