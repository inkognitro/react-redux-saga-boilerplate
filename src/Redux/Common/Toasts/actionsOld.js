const suffix = '8266728a-7572-48cb-9ff4-2e27071e1343';

const ADD_TOAST_ACTION_TYPE = 'ADD_TOAST-' + suffix;
const addToast = (type, message) => {
    return {
        type: ADD_TOAST_ACTION_TYPE,
        data: {
            type: type,
            message: message,
        },
    };
};

const CLOSE_TOAST_ACTION_TYPE = 'CLOSE_TOAST-' + suffix;
const closeToast = (toastId) => {
    return {
        type: CLOSE_TOAST_ACTION_TYPE,
        data: {
            toastId: toastId,
        },
    };
};

export {
    ADD_TOAST_ACTION_TYPE, addToast,
    CLOSE_TOAST_ACTION_TYPE, closeToast,
};