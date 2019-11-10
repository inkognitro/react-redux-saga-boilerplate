const suffix = '8266728a-7572-48cb-9ff4-2e27071e1343';

const APPEND_TOAST_ACTION_TYPE = 'APPEND_TOAST-' + suffix;
const appendToast = (message, type) => {
    return {
        type: APPEND_TOAST_ACTION_TYPE,
        data: {
            message: message,
            type: type,
        },
    };
};

export {
    APPEND_TOAST_ACTION_TYPE, appendToast,
};