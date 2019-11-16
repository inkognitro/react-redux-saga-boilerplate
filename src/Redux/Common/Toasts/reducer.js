import {ADD_TOAST_ACTION_TYPE, CLOSE_TOAST_ACTION_TYPE} from "App/Redux/Common/Toasts/actions";
import uuidV4 from 'uuid/v4';

const createInitialToastState = () => {
    return {
        id: uuidV4(),
        type: 'info',
        message: ''
    };
};

const toast = (state, action) => {
    if(action === undefined) {
        return state;
    }
    if(action.type === ADD_TOAST_ACTION_TYPE) {
        return Object.assign({}, state, action.data);
    }
    return state;
};

const toasts = (state = [], action) => {
    if(action === undefined) {
        return state;
    }
    if(action.type === ADD_TOAST_ACTION_TYPE) {
        return [
            ...state,
            toast(createInitialToastState(), action)
        ];
    }
    if(action.type === CLOSE_TOAST_ACTION_TYPE) {
        return state.filter((toast) => (toast.id !== action.data.toastId));
    }
    return state;
};

export {toasts};