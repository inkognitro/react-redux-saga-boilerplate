import React from 'react';
import {store} from 'App/AppRedux'
import {appendToast} from "App/Common/Toasts/actions";
import {Content} from 'App/Common/PageTypes/Content/Content';
import {Link} from 'App/Common/Link/Link';

export default class Home extends React.Component {
    render() {
        return (
            <Content>
                <Link onClick={() => store.dispatch(appendToast('blablabla', 'info'))}>
                    appendToast
                </Link>
            </Content>
        );
    }
}