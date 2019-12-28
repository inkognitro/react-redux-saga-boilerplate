import React from 'react';
import {ContentPage} from 'App/Components/Common/PageTypes/components/ContentPage';
import {FunctionalLink, Link} from 'App/Components/Common/Link/containers/Link';
import {executeGetRequest, createGetRequest, ExecutionSummary} from "App/Utility/Http/RequestHandling";

export class Home extends React.Component {

    handleGetRequest() {
        const getRequest = createGetRequest({
            url: '//localhost:9000/auth/refreshtoken.json',
            headers: {'X-API-TOKEN': 'some-pseudo-api-token'},
            queryParameters: {
                foo: 'bar',
                hihi: 'blöölk'
            }
        });
        executeGetRequest(getRequest).then((summary: ExecutionSummary) => {
            console.log('executeGetRequest :: then');
            console.log(summary);
        }).catch((summary: ExecutionSummary) => {
            console.log('executeGetRequest :: catch');
            console.log(summary);
        });
    }

    render() {
        return (
            <ContentPage>
                <h1>Home</h1>
                <Link url="/some-page-which-does-not-exist">go to non existing page!</Link>
                <div><FunctionalLink onClick={() => this.handleGetRequest()}>handleGetRequest</FunctionalLink></div>
            </ContentPage>
        );
    }
}