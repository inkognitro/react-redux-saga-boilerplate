import React from 'react';
import {ContentPage} from 'App/Components/Common/PageTypes/components/ContentPage';
import {FunctionalLink, Link} from 'App/Components/Common/Link/containers/Link';
import {executeRequest, createPostRequest, ExecutionSummary} from "App/Utility/Http/ApiRequestHandling";
import {fetchRefreshedCurrentUserApiToken} from "App/Redux/Auth/actions";
import {store} from "App/Redux/root";

export class Home extends React.Component {

    componentDidMount(): void {
        const action = fetchRefreshedCurrentUserApiToken();
        // @ts-ignore
        store.dispatch(action);
    }

    handleRequest() {
        const request = createPostRequest({
            url: '//localhost:9000/auth/refreshtoken.json',
            queryParameters: {
                foo: 'bar',
                hihi: 'blöölk'
            },
            body: {foo: 'bar'},
        });
        executeRequest(request).then((summary: ExecutionSummary) => {
            console.log('executeRequest :: then');
            console.log(summary);
        }).catch((summary: ExecutionSummary) => {
            console.log('executeRequest :: catch');
            console.log(summary);
        });
    }

    render() {
        return (
            <ContentPage>
                <h1>Home</h1>
                <Link url="/some-page-which-does-not-exist">go to non existing page!</Link>
                <div><FunctionalLink onClick={() => this.handleRequest()}>handleRequest</FunctionalLink></div>
            </ContentPage>
        );
    }
}