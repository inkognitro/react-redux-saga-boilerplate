import {combineReducers, createStore} from 'redux'
import {auth} from 'App/Redux/Common/Auth/reducer';
import {toasts} from 'App/Redux/Common/Toasts/reducer';

const appReducer = combineReducers({
    auth,
    toasts,
});

const store = createStore(appReducer, appReducer());

export {store};