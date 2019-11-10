import {combineReducers, createStore} from 'redux'
import {reducer as toasts} from 'App/Common/Toasts/reducer';

const appReducer = combineReducers({
    toasts,
});

const store = createStore(appReducer, appReducer());

export {store};