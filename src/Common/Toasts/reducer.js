import {APPEND_TOAST_ACTION_TYPE} from "App/Common/Toasts/actions";
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
    if(action.type === APPEND_TOAST_ACTION_TYPE) {
        return Object.assign({}, state, action.data);
    }
    return state;
};

const reducer = (state = [], action) => {
    if(action === undefined) {
        return state;
    }
    if(action.type === APPEND_TOAST_ACTION_TYPE) {
        return [
            ...state,
            toast(createInitialToastState(), action)
        ];
    }
    return state;
};

export {reducer};