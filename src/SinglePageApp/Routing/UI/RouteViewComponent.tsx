import {connect} from "react-redux";
import {CurrentRouteManagerInterface} from "Common/Routing/Domain/CurrentRouteManager";
import {Component} from "react";

type RouteViewState<RouteState> = {
    routeState: RouteState,
};

type RouteViewCallbacks = {
    onChangeState(stateChanges: object, callback?: () => void): void,
};

type RouteViewProps<RouteState, Props> = (RouteViewState<RouteState> & RouteViewCallbacks & Props);

class RouteView<RouteState, Props> extends Component<RouteViewProps<RouteState, Props>> {
    constructor(props: Props) {
        super(props);

    }

    getRouteState(): RouteState {
        return this.props.routeState;
    }

    setCurrentRouteState(state: object, callback?: () => void): void {
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
        onChangeState: (stateChanges: object): void => props.currentRouteManager.applyCurrentRouteStateChanges(stateChanges),
    };
}

export type ConnectedRouteViewProps = {
    currentRouteManager: CurrentRouteManagerInterface,
};

const ConnectedRouteView = connect(mapStateToProps, mapDispatchToProps)(RouteView); //todo --> create HOC function!