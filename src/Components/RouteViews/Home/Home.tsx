import React from 'react';
import {ContentPage} from 'App/Components/Common/PageTypes/components/ContentPage';
import {addToast} from "App/Utils/Toaster";
import {Link} from 'App/Components/Common/Link/containers/Link';

export default class Home extends React.Component {
    render() {
        return (
            <ContentPage>
                <Link onClick={() => addToast('info', 'sdfjklsdfjklsdfjkl')}>
                    appendToast
                </Link>
            </ContentPage>
        );
    }
}