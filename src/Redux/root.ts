import {combineReducers, applyMiddleware, createStore, Action} from 'redux'
import {auth} from 'App/Redux/Auth/reducer';
import {toaster} from 'App/Redux/Toaster/reducer';
import {cache} from 'App/Redux/Cache/reducer';
import thunkMiddleware, {ThunkAction} from 'redux-thunk';

const root = combineReducers({
    auth,
    cache,
    toaster,
});

const middleware = applyMiddleware(thunkMiddleware);
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, null, Action<string>>

export type RootState = ReturnType<typeof root>;
export const store = createStore(root, middleware);