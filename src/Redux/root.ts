import {combineReducers, applyMiddleware, createStore} from 'redux'
import {auth} from 'App/Redux/Common/Auth/reducer';
import {toaster} from 'App/Redux/Common/Toaster/reducer';
import thunkMiddleware from 'redux-thunk';

const rootReducer = combineReducers({
    auth,
    toaster,
});

const middleware = applyMiddleware(thunkMiddleware);

export type RootState = ReturnType<typeof rootReducer>;
export const store = createStore(rootReducer, middleware);