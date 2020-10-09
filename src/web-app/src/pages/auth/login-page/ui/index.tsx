import React, { FC } from "react";
import { connect } from "react-redux";
import { ContentPage } from "web-app/foundation/ui";
import { RootState } from "web-app/services.factory";
import { Card } from "packages/common/layout-foundation/ui/web";
import { Form } from "packages/common/form/ui/web";
import {
    FormGroup,
    PrimaryButton,
    SimpleInputGroup,
} from "packages/common/form-element/ui/web";
import { Dispatch } from "redux";
import { createLogin } from "../domain";
import { LoginPageState } from "../domain/types";

type LoginPageComponentCallbacks = {
    onSubmitLoginForm: () => void
};

type LoginPageComponentState = {
    data: LoginPageState
};

type LoginPageComponentProps = (LoginPageComponentState & LoginPageComponentCallbacks);

const LoginPage: FC<LoginPageComponentProps> = (props) => (
    <ContentPage>
        <Card title="Login">
            <Form onSubmit={props.onSubmitLoginForm}>
                <FormGroup>
                    <SimpleInputGroup
                        labelTranslation={{
                            translationId: 'non-existing-translation-id-takes-fallback',
                            fallback: 'Username',
                        }}
                        formElement={props.data.form.elementsByName.username}
                    />
                </FormGroup>
                <FormGroup>
                    <SimpleInputGroup
                        labelTranslation={{
                            translationId: 'non-existing-translation-id-takes-fallback',
                            fallback: 'Password',
                        }}
                        formElement={props.data.form.elementsByName.password}
                    />
                </FormGroup>
                <FormGroup>
                    <SimpleInputGroup
                        labelTranslation={{
                            translationId: 'non-existing-translation-id-takes-fallback',
                            fallback: 'stay logged in',
                        }}
                        formElement={props.data.form.elementsByName.rememberMe}
                    />
                </FormGroup>
                <FormGroup>
                    <PrimaryButton onClick={props.onSubmitLoginForm}>Login</PrimaryButton>
                </FormGroup>
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

export const ConnectedLoginPageWC = connect(mapStateToProps, mapDispatchToProps)(LoginPage);
