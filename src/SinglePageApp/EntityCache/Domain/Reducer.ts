import {userRepository} from "Common/EntityCache/Domain/User/Event/Reducer";
import {combineReducers} from "redux";

export const cache = combineReducers({
    userRepository,
});