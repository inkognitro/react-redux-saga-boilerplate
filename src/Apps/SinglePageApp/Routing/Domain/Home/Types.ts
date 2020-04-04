import {RootState} from "SinglePageApp/Bootstrap/Store";
import {LeakReduxState} from "SinglePageApp/Routing/Domain/Home/Command/LeakReduxState";

export type HomeState = {
    foo: string,
};

export type HomeEvent = (LeakReduxState);

export type HomeStateSelector = (state: RootState) => HomeState;