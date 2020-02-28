import {connect} from "react-redux";
import {CurrentRouteManagerInterface} from "Common/Routing/Domain/CurrentRouteManager";
import {Component} from "react";

type RouteViewState<State> = {
    state: State,
};

type RouteViewCallbacks = {
    onChangeState(stateChanges: object, callback?: () => void): void,
};

type RouteViewProps<State, Props> = (RouteViewState<State> & RouteViewCallbacks & Props);

class RouteView<State, Props> extends Component<RouteViewProps<State, Props>> {
    getState(): State {
        return this.props.state;
    }

    setState(state: object, callback?: () => void): void {
        this.props.onChangeState(state, callback);
    }
}

function mapStateToProps ({}, props: ConnectedRouteViewProps): object {
    return {
        state: props.currentRouteManager.getCurrentRouteState(),
    };
}

function mapDispatchToProps ({}, props: ConnectedRouteViewProps): object {
    return {
        onChangeState: (stateChanges: object): void => props.currentRouteManager.setCurrentRouteState(stateChanges),
    };
}

export type ConnectedRouteViewProps = {
    currentRouteManager: CurrentRouteManagerInterface,
};

const ConnectedRouteView = connect(mapStateToProps, mapDispatchToProps)(RouteView); //todo --> create HOC function!