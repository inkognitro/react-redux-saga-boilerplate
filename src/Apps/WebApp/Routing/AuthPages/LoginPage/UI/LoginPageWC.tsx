import React, { FC } from "react";
import { connect } from "react-redux";
import { ContentPage } from "Apps/WebApp/Foundation";
import { RootState } from "Apps/WebApp/Bootstrap/ServicesFactory";
import { CardWC } from "Packages/Common/LayoutFoundation";
import { FormWC } from "Packages/Common/Form";
import {
    TextFieldWC,
    FormElementGroupWC,
    PrimaryButtonWC,
    PasswordFieldWC, CheckboxWC,
} from "Packages/Common/FormElement";
import { Dispatch } from "redux";
import { LoginPageState } from "../Domain/Types";
import { createLogin } from "../Domain/Command/Login";

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
                    <CheckboxWC data={props.data.form.elementsByName.rememberMe} />
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
