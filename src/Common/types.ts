import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {Action} from "redux";

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, object, null, Action<string>>; //todo: remove type and library!
export type AppDispatch = ThunkDispatch<object, null, Action<string>>;