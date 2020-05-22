import React, { FC } from "react";
import { connect } from "react-redux";
import { ContentPage } from "Apps/WebSPA/LayoutFoundation/UI/PageTypes/ContentPage";
import { RootState } from "Apps/WebSPA/Bootstrap/ServicesFactory";
import { LoginPageState } from "Apps/WebSPA/Routing/AuthPages/LoginPage/Domain/Types";
import { CardWC } from "Packages/Common/LayoutFoundation/UI/CardWC";
import { Form } from "Packages/Common/Form/WebUI/Form";
import { TextField } from "Packages/Common/FormElement/WebUI/TextField";
import { FormElementGroup } from "Packages/Common/FormElement/WebUI/FormElementGroup";
import { PasswordField } from "Packages/Common/FormElement/WebUI/PasswordField";
import { PrimaryButton } from "Packages/Common/FormElement/WebUI/PrimaryButton";
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
            <Form onSubmit={props.onSubmitLoginForm}>
                <FormElementGroup>
                    <TextField data={props.data.form.elementsByName.username} />
                </FormElementGroup>
                <FormElementGroup>
                    <PasswordField data={props.data.form.elementsByName.password} />
                </FormElementGroup>
                <FormElementGroup>
                    <PrimaryButton onClick={props.onSubmitLoginForm}>
                        Login
                    </PrimaryButton>
                </FormElementGroup>
            </Form>
        </CardWC>
    </ContentPage>
);

const mapStateToProps = (state: RootState): LoginPageComponentState => ({
    data: state.routing.authPages.loginPage,
});

const mapDispatchToProps = (dispatch: Dispatch): LoginPageComponentCallbacks => ({
    onSubmitLoginForm: () => dispatch(createLogin()),
});

export const LoginPage = connect(mapStateToProps, mapDispatchToProps)(DumbLoginPage);
