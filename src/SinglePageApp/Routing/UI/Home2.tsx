import {Component} from 'react';
import {homeRouteUrlSpecification} from "SinglePageApp/Routing/Domain/Routes";
import {UrlSpecification} from "Common/Routing/Domain/CurrentRouteManager";
import {AppServices} from "SinglePageApp/App";
import {connect} from "react-redux";

//COMMON!
type RouteSpecification<Services, RouteState> = {
    url: UrlSpecification,
    component: RouteViewComponent<Services, RouteState>,
    initialRouteState: RouteState,
};

type RouteViewComponentPropsState<Services, RouteState> = {
    services: Services,
    routeState: RouteState,
};
type RouteViewComponentPropsCallbacks = {
    onChangeRouteState: (stateChanges: object, callback?: () => void) => void,
};
type RouteViewComponentProps<Services, RouteState> = (RouteViewComponentPropsState<Services, RouteState> & RouteViewComponentPropsCallbacks);

interface RouteViewComponent<Services, RouteState> extends Component<RouteViewComponentProps<Services, RouteState>> {

}

//APP!
type AppRouteViewComponent<RouteState> = RouteViewComponent<AppServices, RouteState>;
type AppRouteViewComponentProps<RouteState> = RouteViewComponentProps<AppServices, RouteState>;
type AppRouteSpecification<RouteState> = RouteSpecification<AppServices, RouteState>;

//ROUTE!
type HomeProps = AppRouteViewComponentProps<HomeRouteState>;
type HomeRouteState = {  foo: string };
class Home extends Component<HomeProps> implements AppRouteViewComponent<HomeRouteState> {
    render() {
        console.log('this.props');
        console.log(this.props);
        return null;
    }
}

function mapStateToProps(_, services: AppServices): RouteViewComponentPropsState<AppServices, HomeRouteState> {
    return {
        services: services,
        //@ts-ignore
        routeState: services.currentRouteManager.getCurrentRouteState(),
    };
}

function mapDispatchToProps(_, services: AppServices): RouteViewComponentPropsCallbacks {
    return {
        onChangeRouteState: (stateChanges: object, callback?: () => void) => services.currentRouteManager.applyCurrentRouteStateChanges(stateChanges, callback),
    };
}

export function createConnectedRouteViewComponent<RouteState>(Component: AppRouteViewComponent<RouteState>) {
    //@ts-ignore
    return connect(mapStateToProps, mapDispatchToProps)(Component);
}

export const routeSpecification: AppRouteSpecification<HomeRouteState> = {
    url: homeRouteUrlSpecification,
    //@ts-ignore
    component: createConnectedRouteViewComponent<HomeRouteState>(Home),
    initialRouteState: {
        foo: 'bar',
    },
};