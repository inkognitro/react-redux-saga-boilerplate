/*
import {Message} from "App/Redux/Toaster/Message/types";
import {
    ToastTypes,
    AddToast,
    BeginShowToastAnimation,
    EndShowToastAnimation, ToastActionTypes
} from "./types";

type AddToastProps = {
    type: ToastTypes,
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
        type: ToastActionTypes.ADD_TOAST,
        payload: {
            toast: toast,
        }
    }
}

function beginShowToastAnimation(toastId: string): BeginShowToastAnimation {
    return {
        type: ToastActionTypes.BEGIN_SHOW_TOAST_ANIMATION,
        payload: {
            toastId: toastId,
        }
    }
}

function endShowToastAnimation(toastId: string): EndShowToastAnimation {
    return {
        type: ToastActionTypes.END_SHOW_TOAST_ANIMATION,
        payload: {
            toastId: toastId,
        }
    }
}

const getToastIdByType = (type: string): string => {
    if (type === ToastTypes.INFO){
        return '8e5ae1bc-7f5f-49b8-8aff-2c6a5955c612';
    }
    if (type === ToastTypes.SUCCESS){
        return '5f6a41f2-60b3-43b6-99a9-a2a453c33473';
    }
    if (type === ToastTypes.ERROR){
        return '8027eb4b-d635-4770-8589-533f759cbe9f';
    }
    throw new Error('Toast type "' + type + '" not supported!');
};
*/