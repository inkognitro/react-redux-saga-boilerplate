import {userRepository} from "./UserRepository/Reducer";
import {combineReducers} from "redux";

export const cache = combineReducers({
    userRepository,
});