import {userRepository} from "Common/EntityCache/Domain/User/Reducer";
import {combineReducers} from "redux";

export const cache = combineReducers({
    userRepository,
});