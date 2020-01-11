import {userRepository} from "./UserRepository/reducer";
import {combineReducers} from "redux";

export const cache = combineReducers({
    userRepository,
});