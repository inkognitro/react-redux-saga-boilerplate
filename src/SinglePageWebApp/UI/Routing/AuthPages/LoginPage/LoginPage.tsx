import React, { FC } from "react";
import { connect } from "react-redux";
import { ContentPage } from "SinglePageWebApp/UI/Base/PageTypes/ContentPage";
import { RootState } from "SinglePageWebApp/Bootstrap/ServicesFactory";
import { LoginPageState } from "SinglePageWebApp/Domain/Routing/AuthPages/LoginPage/Types";
import { Card } from "Packages/Common/UI/Web/Card";
import { Form } from "Packages/Common/UI/Web/FormUtils/Form/Form";
import { TextField } from "Packages/Common/UI/Web/FormUtils/FormElements/TextField";
import { FormElementGroup } from "Packages/Common/UI/Web/FormUtils/FormElements/FormElementGroup";
import { PasswordField } from "Packages/Common/UI/Web/FormUtils/FormElements/PasswordField";
import { PrimaryButton } from "Packages/Common/UI/Web/FormUtils/FormElements/PrimaryButton";
import { Dispatch } from "redux";
import { createLogin } from "SinglePageWebApp/Domain/Routing/AuthPages/LoginPage/Command/Login";

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
