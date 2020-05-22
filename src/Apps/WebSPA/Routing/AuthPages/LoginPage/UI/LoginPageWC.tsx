import React, { FC } from "react";
import { connect } from "react-redux";
import { ContentPage } from "Apps/WebSPA/LayoutFoundation/UI/PageTypes/ContentPage";
import { RootState } from "Apps/WebSPA/Bootstrap/ServicesFactory";
import { LoginPageState } from "Apps/WebSPA/Routing/AuthPages/LoginPage/Domain/Types";
import { CardWC } from "Packages/Common/LayoutFoundation/UI/CardWC";
import { FormWC } from "Packages/Common/Form/UI/FormWC";
import { TextFieldWC } from "Packages/Common/FormElement/UI/TextFieldWC";
import { FormElementGroupWC } from "Packages/Common/FormElement/UI/FormElementGroupWC";
import { PasswordFieldWC } from "Packages/Common/FormElement/UI/PasswordFieldWC";
import { PrimaryButtonWC } from "Packages/Common/FormElement/UI/PrimaryButtonWC";
import { Dispatch } from "redux";
import { createLogin } from "Apps/WebSPA/Routing/AuthPages/LoginPage/Domain/Command/Login";

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
