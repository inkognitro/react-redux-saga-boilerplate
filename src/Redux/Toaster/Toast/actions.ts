import {Message} from "App/Redux/Toaster/Message/types";
import {
    ADD_TOAST,
    ToasterActionType,
    toastType,
    INFO_TOAST_TYPE,
    SUCCESS_TOAST_TYPE,
    ERROR_TOAST_TYPE,
    AddToast,
    BEGIN_SHOW_TOAST_ANIMATION,
    END_SHOW_TOAST_ANIMATION,
    BeginShowToastAnimation,
    EndShowToastAnimation
} from "./types";

type AddToastProps = {
    type: toastType,
    messages: Message[],
};
function addToast(props: AddToastProps): AddToast {
    const toast = {
        id: getToastIdByType(props.type),
        type: props.type,
        messages: props.messages,
        isVisible: false,
        isAnimationRunning: false
    };
    return {
        type: ADD_TOAST,
        payload: {
            toast: toast,
        }
    }
}

function beginShowToastAnimation(toastId: string): BeginShowToastAnimation {
    return {
        type: BEGIN_SHOW_TOAST_ANIMATION,
        payload: {
            toastId: toastId,
        }
    }
}

function endShowToastAnimation(toastId: string): EndShowToastAnimation {
    return {
        type: END_SHOW_TOAST_ANIMATION,
        payload: {
            toastId: toastId,
        }
    }
}

const getToastIdByType = (type: string): string => {
    if (type === INFO_TOAST_TYPE){
        return '8e5ae1bc-7f5f-49b8-8aff-2c6a5955c612';
    }
    if (type === SUCCESS_TOAST_TYPE){
        return '5f6a41f2-60b3-43b6-99a9-a2a453c33473';
    }
    if (type === ERROR_TOAST_TYPE){
        return '8027eb4b-d635-4770-8589-533f759cbe9f';
    }
    throw new Error('Toast type "' + type + '" not supported!');
};