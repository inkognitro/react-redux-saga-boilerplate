import React, { FC } from "react";
import { connect } from "react-redux";
import { ContentPage } from "SinglePageApp/UI/Base/PageTypes/ContentPage";
import { RootState } from "SinglePageApp/Bootstrap/ServicesFactory";
import { LoginPageState } from "SinglePageApp/Domain/Routing/AuthPages/LoginPage/Types";

type LoginPageComponentCallbacks = {};

type LoginPageComponentState = {
    data: LoginPageState
};

type LoginPageComponentProps = (LoginPageComponentState & LoginPageComponentCallbacks);

const DumbLoginPage: FC<LoginPageComponentProps> = (props) => (
    <ContentPage>
        FormId:
        {' '}
        {props.data.form.id}
    </ContentPage>
);

const mapStateToProps = (state: RootState): LoginPageComponentState => ({
    data: state.routing.loginPage,
});

const mapDispatchToProps = (): LoginPageComponentCallbacks => ({});

export const LoginPage = connect(mapStateToProps, mapDispatchToProps)(DumbLoginPage);
