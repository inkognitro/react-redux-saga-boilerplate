import {connect} from "react-redux";
import {CurrentRouteManagerInterface} from "Common/Routing/Domain/CurrentRouteManager";
import {Component, ComponentType} from "react";

type ConnectedRouteViewProps = {
    currentRouteManager: CurrentRouteManagerInterface,
};

type RouteViewComponentState<CurrentRouteState> = {
    currentRouteState: CurrentRouteState
};

type RouteViewComponentCallbacks = {
    onChangeCurrentRouteState(stateChanges: object, callback?: () => void): void
};

function mapDispatchToProps({}, props: ConnectedRouteViewProps): RouteViewComponentCallbacks {
    return {
        onChangeCurrentRouteState: (stateChanges: object, callback?: () => void): void => props.currentRouteManager.applyCurrentRouteStateChanges(stateChanges, callback),
    };
}

export function createRouteViewComponent<CurrentRouteState>(Component: ComponentType) {
    return connect(
        function ({}, props: ConnectedRouteViewProps): RouteViewComponentState<CurrentRouteState> {
        return {
            //@ts-ignore
            currentRouteState: props.currentRouteManager.getCurrentRouteState(),
        };
    }, mapDispatchToProps)(Component);
}

type RouteViewComponentProps<Props, CurrentRouteState> = (Props & {
    currentRouteManager: CurrentRouteManagerInterface,
    initialCurrentRouteState: CurrentRouteState,
});

export abstract class RouteViewComponent<Props, CurrentRouteState> extends Component<RouteViewComponentProps<Props, CurrentRouteState>> {
    protected constructor(props: RouteViewComponentProps<Props, CurrentRouteState>) {
        super(props);
        //@ts-ignore
        this.props.currentRouteManager.setCurrentRouteState(props.initialCurrentRouteState);
    }

    protected setCurrentRouteState(stateChanges: object): void {
        this.props.currentRouteManager.applyCurrentRouteStateChanges(stateChanges);
    }

    protected getCurrentRouteState(): CurrentRouteState {
        //@ts-ignore
        return this.props.currentRouteManager.getCurrentRouteState();
    }

    componentWillUnmount(): void {
        this.props.currentRouteManager.setCurrentRouteState({});
    }
}