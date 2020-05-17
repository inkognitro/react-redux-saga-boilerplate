import React, { FC } from "react";
import { connect } from "react-redux";
import { ContentPage } from "Apps/WebSPA/UI/PageTypes/ContentPage";
import { RootState } from "Apps/WebSPA/Bootstrap/ServicesFactory";
import { LoginPageState } from "Apps/WebSPA/Domain/Routing/AuthPages/LoginPage/Types";
import { Card } from "Packages/Common/UI/Web/Card";
import { Form } from "Packages/Common/UI/Web/Form/Form";
import { TextField } from "Packages/Common/UI/Web/FormElement/TextField";
import { FormElementGroup } from "Packages/Common/UI/Web/FormElement/FormElementGroup";
import { PasswordField } from "Packages/Common/UI/Web/FormElement/PasswordField";
import { PrimaryButton } from "Packages/Common/UI/Web/FormElement/PrimaryButton";
import { Dispatch } from "redux";
import { createLogin } from "Apps/WebSPA/Domain/Routing/AuthPages/LoginPage/Command/Login";

type LoginPageComponentCallbacks = {
    onSubmitLoginForm: () => void
};

type LoginPageComponentState = {
    data: LoginPageState
};

type LoginPageComponentProps = (LoginPageComponentState & LoginPageComponentCallbacks);

const DumbLoginPage: FC<LoginPageComponentProps> = (props) => (
    <ContentPage>
        <Card title="Login">
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
        </Card>
    </ContentPage>
);

const mapStateToProps = (state: RootState): LoginPageComponentState => ({
    data: state.routing.authPages.loginPage,
});

const mapDispatchToProps = (dispatch: Dispatch): LoginPageComponentCallbacks => ({
    onSubmitLoginForm: () => dispatch(createLogin()),
});

export const LoginPage = connect(mapStateToProps, mapDispatchToProps)(DumbLoginPage);
