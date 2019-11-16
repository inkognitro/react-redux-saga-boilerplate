import {REFRESH_TOKEN_ACTION_TYPE} from "App/Redux/Common/Auth/actions";

const initialAuthState = {
    apiToken: null,
    user: null
};

const auth = (state = initialAuthState, action) => {
    if(action === undefined) {
        return state;
    }

    //todo: have a look at redux-thunk for asnyc actions with promises!

    return state;
};

export {auth};