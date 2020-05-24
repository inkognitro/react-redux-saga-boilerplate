import React, { FC } from "react";
import { connect } from "react-redux";
import { ContentPage } from "Apps/WebSPA/Foundation";
import { RootState } from "Apps/WebSPA/Bootstrap/ServicesFactory";
import { LoginPageState, createLogin } from "Apps/WebSPA/Routing/AuthPages/LoginPage";
import { CardWC } from "Packages/Common/LayoutFoundation";
import { FormWC } from "Packages/Common/Form";
import {
    TextFieldWC,
    FormElementGroupWC,
    PrimaryButtonWC,
    PasswordFieldWC,
} from "Packages/Common/FormElement";
import { Dispatch } from "redux";

type LoginPageComponentCallbacks = {
    onSubmitLoginForm: () => void
};

type LoginPageComponentState = {
    data: LoginPageState
};

type LoginPageComponentProps = (LoginPageComponentState & LoginPageComponentCallbacks);

const DumbLoginPage: FC<LoginPageComponentProps> = (props) => (
    <ContentPage>
        <CardWC title="Login">
            <FormWC onSubmit={props.onSubmitLoginForm}>
                <FormElementGroupWC>
                    <TextFieldWC data={props.data.form.elementsByName.username} />
                </FormElementGroupWC>
                <FormElementGroupWC>
                    <PasswordFieldWC data={props.data.form.elementsByName.password} />
                </FormElementGroupWC>
                <FormElementGroupWC>
                    <PrimaryButtonWC onClick={props.onSubmitLoginForm}>
                        Login
                    </PrimaryButtonWC>
                </FormElementGroupWC>
            </FormWC>
        </CardWC>
    </ContentPage>
);

const mapStateToProps = (state: RootState): LoginPageComponentState => ({
    data: state.routing.authPages.loginPage,
});

const mapDispatchToProps = (dispatch: Dispatch): LoginPageComponentCallbacks => ({
    onSubmitLoginForm: () => dispatch(createLogin()),
});

export const LoginPageWC = connect(mapStateToProps, mapDispatchToProps)(DumbLoginPage);
