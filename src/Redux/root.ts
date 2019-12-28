import {combineReducers, applyMiddleware, createStore} from 'redux'
import {auth} from 'App/Redux/Auth/reducer';
import {toaster} from 'App/Redux/Toaster/reducer';
import {cache} from 'App/Redux/Cache/reducer';
import thunkMiddleware from 'redux-thunk';

const root = combineReducers({
    auth,
    cache,
    toaster,
});

const middleware = applyMiddleware(thunkMiddleware);

export type RootState = ReturnType<typeof root>;
export const store = createStore(root, middleware);