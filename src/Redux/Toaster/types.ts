export type ToasterState = {
    messagesToAdd: MessageToAdd[],
    toasts: Toast[],
};

export type MessageToAdd = {
    id: string,
    toastId: string,
    type: ToastTypes,
    content: string,
};

export enum ToastTypes {
    INFO = 'info',
    SUCCESS = 'success',
    WARNING = 'warning',
    ERROR = 'error',
}

export enum CommonToastIds {
    INFO = '5011d2e7-ce60-4186-bbee-bf3e8ab57c3b',
    SUCCESS = 'fb02626d-b3f7-4589-b880-ae468d763f7f',
    WARNING = '9210671f-37da-4258-90e5-dc6faf6ba87a',
    ERROR = '3fd1b7de-cf2e-49ba-bda3-fcde9e0632bd',
}

export type Toast = {
    id: string,
    type: ToastTypes,
    messages: Message[],
};

export type Message = {
    id: string,
    content: string,
    isIntroAnimationEnabled: boolean,
};

export enum ToasterActionTypes {
    ADD_MESSAGE_TO_PIPELINE = 'ADD_MESSAGE_TO_PIPELINE-8266728a-7572-48cb-9ff4-2e27071e1343',
    ADD_TOAST = 'ADD_TOAST-8266728a-7572-48cb-9ff4-2e27071e1343',
    MOVE_MESSAGES_FROM_PIPELINE_TO_TOAST = 'MOVE_MESSAGES_FROM_PIPELINE_TO_TOAST-8266728a-7572-48cb-9ff4-2e27071e1343',
}

type AddMessageToPipeline = {
    type: ToasterActionTypes.ADD_MESSAGE_TO_PIPELINE,
    payload: {
        messageToAdd: MessageToAdd,
    }
};

type AddToast = {
    type: ToasterActionTypes.ADD_TOAST,
    payload: {
        toast: Toast,
    }
};

type MoveMessagesFromPipelineToToast = {
    type: ToasterActionTypes.MOVE_MESSAGES_FROM_PIPELINE_TO_TOAST,
    payload: {
        toastId: string,
        areMessageIntroAnimationsEnabled: boolean,
    }
};

export type ToasterActions = (AddMessageToPipeline | AddToast | MoveMessagesFromPipelineToToast);