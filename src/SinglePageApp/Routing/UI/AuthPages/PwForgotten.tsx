import React from 'react';
import {ContentPage} from 'SinglePageApp/Layout/UI/PageTypes/ContentPage';
import {PrimaryButton} from "Common/Layout/UI/Form/Buttons/PrimaryButton";
import {TextField} from "Common/Layout/UI/Form/InputElements/TextField";
import {Card} from "Common/Layout/UI/Card/Card";
import {Link} from "Common/Layout/UI/Link/Link";
import {createLoginRouteUrl} from "SinglePageApp/Routing/Domain/RouteFactory";

export class PwForgotten extends React.Component {
    render() {
        return (
            <ContentPage topDividedContent={true}>
                <div className="col-sm-12 col-md-6 offset-md-3">
                    <Card title="Request password reset link">
                        <div className="card-text">
                            <TextField label="email address" placeholder="e.g. foo@bar.com" />
                            <PrimaryButton onClick={() => console.log('request password reset link')}>
                                send
                            </PrimaryButton>
                        </div>
                        <div className="card-text text-right">
                            <small className="text-muted">
                                <Link url={createLoginRouteUrl()}>
                                    back to login
                                </Link>
                            </small>
                        </div>
                    </Card>
                </div>
            </ContentPage>
        );
    }
}