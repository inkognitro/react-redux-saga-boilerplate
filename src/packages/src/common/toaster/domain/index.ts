import {
    ToasterStateSelector as ToasterStateSelectorType,
    ToasterState as ToasterStateType,
    MessageToAdd as MessageToAddType,
    Toast as ToastType,
    Message as MessageType,
    ToasterSettings as ToasterSettingsType,
} from './types';
import {
    DispatchToastsFromResultGenerator as DispatchToastsFromResultGeneratorType,
} from "./saga/effect";
import {
    RemoveMessage as RemoveMessageType,
    ShowMessage as ShowMessageType,
} from "./command";
import {
    MessageIntroAnimationsWereFinished as MessageIntroAnimationsWereFinishedType,
    MessageOutroAnimationWasStarted as MessageOutroAnimationWasStartedType,
    MessagesWereAddedToToast as MessagesWereAddedToToastType,
    MessageWasAddedToPipeline as MessageWasAddedToPipelineType,
    MessageWasRemoved as MessageWasRemovedType,
    ToastIntroAnimationWasFinished as ToastIntroAnimationWasFinishedType,
    ToastOutroAnimationWasStarted as ToastOutroAnimationWasStartedType,
    ToastWasAdded as ToastWasAddedType,
    ToastWasRemoved as ToastWasRemovedType,
} from "./event";

export type ToasterSettings = ToasterSettingsType;
export type ToasterStateSelector = ToasterStateSelectorType;
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

export { ToastTypes } from './types';
export { createToasterSaga } from "./saga/flow";
export { dispatchToastsFromResult } from "./saga/effect";
export { toasterReducer } from './reducer';
export { ToasterCommandTypes, createRemoveMessage, createShowMessage } from "./command";
export { ToasterEventTypes } from "./event";
export { getAllToasts } from "./query";
