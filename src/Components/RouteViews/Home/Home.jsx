import React from 'react';
import {appRedux} from 'App/Redux/AppRedux'
import {appendToast} from "App/Redux/Common/Toasts/actions";
import {Content} from 'App/Components/Common/PageTypes/components/Content';
import {Link} from 'App/Components/Common/Link/containers/Link';

export default class Home extends React.Component {
    render() {
        return (
            <Content>
                <Link onClick={() => appRedux.dispatch(appendToast('blablabla', 'info'))}>
                    appendToast
                </Link>
            </Content>
        );
    }
}