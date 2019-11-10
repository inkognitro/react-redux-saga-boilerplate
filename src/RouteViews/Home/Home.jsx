import React from 'react';
import {store} from 'App/AppRedux'
import {appendToast} from "App/Common/Toasts/actions";
import {Content} from 'App/Common/PageTypes/Content/Content';

export default class Home extends React.Component {
    render() {
        return (
            <Content>
                <a href="#" onClick={(event) => {
                    event.preventDefault();
                    store.dispatch(appendToast('blabalbla lasdfklj', 'info'))}
                }>
                    appendToast
                </a>
            </Content>
        );
    }
}