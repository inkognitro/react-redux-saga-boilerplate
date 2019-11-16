import {combineReducers, applyMiddleware, createStore} from 'redux'
import {auth} from 'App/Redux/Common/Auth/reducer';
import {toasts} from 'App/Redux/Common/Toasts/reducer';
import thunkMiddleware from 'redux-thunk';

const appReducer = combineReducers({
    auth,
    toasts,
});
const middleware = applyMiddleware(thunkMiddleware);
const store = createStore(appReducer, middleware);
export default store;