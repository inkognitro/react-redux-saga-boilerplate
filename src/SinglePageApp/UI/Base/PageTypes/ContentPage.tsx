import React, {Component} from 'react';
import {NavBar} from "../NavBar";

export type ContentPageProps = {
    topDividedContent?: boolean,
};

export class ContentPage extends Component<ContentPageProps> {
    render() {
        return (
            <React.Fragment>
                <NavBar />
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