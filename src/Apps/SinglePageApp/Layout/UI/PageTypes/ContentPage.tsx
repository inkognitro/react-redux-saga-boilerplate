import React, {Component} from 'react';
import {NavBar} from "../NavBar";
import {AuthManagerInterface} from "Common/Auth/Domain/AuthManager";
import './ContentPage.scss';

export type ContentPageProps = {
    authManager: AuthManagerInterface,
    topDividedContent?: boolean,
};

export class ContentPage extends Component<ContentPageProps> {
    render() {
        return (
            <React.Fragment>
                <NavBar authManager={this.props.authManager} />
                <div className={'container' + (this.props.topDividedContent ? ' content-page-content-container-top-divided' : '')}>
                    <div className="row">
                        <div className="col-sm">
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}