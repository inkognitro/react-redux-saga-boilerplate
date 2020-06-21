import React, { FC } from "react";
import { connect } from "react-redux";
import { ContentPage } from "WebApp/Foundation/UI";
import { RootState } from "WebApp/ServicesFactory";
import { CardWC } from "Packages/Common/LayoutFoundation/Web";
import { FormWC } from "Packages/Common/Form/Web";
import {
    FormGroupWC,
    PrimaryButtonWC,
    SimpleInputGroupWC,
} from "Packages/Common/FormElement/Web";
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

const LoginPage: FC<LoginPageComponentProps> = (props) => (
    <ContentPage>
        <CardWC title="Login">
            <FormWC onSubmit={props.onSubmitLoginForm}>
                <FormGroupWC>
                    <SimpleInputGroupWC
                        labelTranslation={{
                            translationId: 'non-existing-translation-id-takes-fallback',
                            fallback: 'Username',
                        }}
                        formElement={props.data.form.elementsByName.username}
                    />
                </FormGroupWC>
                <FormGroupWC>
                    <SimpleInputGroupWC
                        labelTranslation={{
                            translationId: 'non-existing-translation-id-takes-fallback',
                            fallback: 'Password',
                        }}
                        formElement={props.data.form.elementsByName.password}
                    />
                </FormGroupWC>
                <FormGroupWC>
                    <SimpleInputGroupWC
                        labelTranslation={{
                            translationId: 'non-existing-translation-id-takes-fallback',
                            fallback: 'stay logged in',
                        }}
                        formElement={props.data.form.elementsByName.rememberMe}
                    />
                </FormGroupWC>
                <FormGroupWC>
                    <PrimaryButtonWC onClick={props.onSubmitLoginForm}>Login</PrimaryButtonWC>
                </FormGroupWC>
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

export const ConnectedLoginPageWC = connect(mapStateToProps, mapDispatchToProps)(LoginPage);
