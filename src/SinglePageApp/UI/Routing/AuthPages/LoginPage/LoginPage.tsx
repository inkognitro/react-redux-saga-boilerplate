import React, { FC } from "react";
import { connect } from "react-redux";
import { ContentPage } from "SinglePageApp/UI/Base/PageTypes/ContentPage";
import { RootState } from "SinglePageApp/Bootstrap/ServicesFactory";
import { LoginPageState } from "SinglePageApp/Domain/Routing/AuthPages/LoginPage/Types";
import { Card } from "Common/UI/Base/Card";
import { Form } from "Common/UI/FormUtils/Form/Form";
import { TextField } from "Common/UI/FormUtils/FormElements/TextField";
import { FormElementGroup } from "Common/UI/FormUtils/FormElements/FormElementGroup";
import { PasswordField } from "Common/UI/FormUtils/FormElements/PasswordField";
import { PrimaryButton } from "Common/UI/FormUtils/FormElements/PrimaryButton";
import { Dispatch } from "redux";
import { createLogin } from "SinglePageApp/Domain/Routing/AuthPages/LoginPage/Command/Login";

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
