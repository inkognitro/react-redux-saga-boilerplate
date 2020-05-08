import { combineReducers, Reducer } from "redux";
import { HomeState } from "SinglePageApp/Domain/Routing/Home/Types";
import { createTextFieldReducer } from "Common/Domain/FormUtils/FormElements/Reducer/TextFieldReducer";

export const homeReducer: Reducer<HomeState> = combineReducers({
    toastContentField: createTextFieldReducer({ value: "Hi there :)" }),
});
