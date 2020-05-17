import React, { FC } from "react";
import { FunctionalLink, RouterLink } from "Packages/Common/UI/Web/Link";
import { ToastTypes } from "Packages/Common/Domain/Toaster/Types";
import { Dispatch } from "redux";
import { createShowMessage } from "Packages/Common/Domain/Toaster/Command/ShowMessage";
import { connect } from "react-redux";
import { FormElementGroup } from "Packages/Common/UI/Web/FormElement/FormElementGroup";
import { Label } from "Packages/Common/UI/Web/FormElement/Label";
import { createLogin } from "Packages/Common/Domain/Authentication/Command/Login";
import { TextField } from "Packages/Common/UI/Web/FormElement/TextField";
import { createLeakReduxState } from "SinglePageWebApp/Domain/Routing/HomePage/Command/LeakReduxState";
import { ContentPage } from "SinglePageWebApp/UI/PageTypes/ContentPage";
import { RootState } from "SinglePageWebApp/Bootstrap/ServicesFactory";
import { TextFieldState } from "Packages/Common/Domain/FormElement/Types";
import uuidV4 from 'uuid/v4';

type DumbHomePageCallbacks = {
    onClickLogin: () => void;
    onAddToast: (type: ToastTypes, content: string) => void;
    onClickLeakReduxState: () => void;
};

type DumbHomePageState = {
    toastContentField: TextFieldState;
};

type DumbHomePageProps = (DumbHomePageState & DumbHomePageCallbacks);

const DumbHomePage: FC<DumbHomePageProps> = (props) => (
    <ContentPage>
        <h1>Features</h1>
        <br />
        <br />
        <h3>Routing</h3>
        <div>
            <RouterLink url="/some-page-which-does-not-exist">
                go to non existing page
            </RouterLink>
        </div>
        <br />
        <h3>Authentication</h3>
        <FunctionalLink onClick={props.onClickLogin}>
            Login
        </FunctionalLink>
        <br />

        <br />
        <h3>Toasts</h3>
        <div>
            <FunctionalLink onClick={(): void => props.onAddToast(ToastTypes.SUCCESS, props.toastContentField.value)}>
                add a success toast message
            </FunctionalLink>
            {' '}
            (is being closed after 3 seconds)
        </div>
        <div>
            <FunctionalLink onClick={(): void => props.onAddToast(ToastTypes.INFO, props.toastContentField.value)}>
                add an info toast message
            </FunctionalLink>
        </div>
        <div>
            <FunctionalLink onClick={(): void => props.onAddToast(ToastTypes.WARNING, props.toastContentField.value)}>
                add a warning toast message
            </FunctionalLink>
        </div>
        <div>
            <FunctionalLink onClick={(): void => props.onAddToast(ToastTypes.ERROR, props.toastContentField.value)}>
                add an error toast message
            </FunctionalLink>
        </div>

        <br />
        <FormElementGroup>
            <Label title={`Toast content: ${props.toastContentField.value}`} formElementId={props.toastContentField.id} />
            <TextField data={props.toastContentField} />
        </FormElementGroup>

        <br />
        <h3>Redux</h3>
        <div>
            <FunctionalLink onClick={props.onClickLeakReduxState}>
                leak redux state in console
            </FunctionalLink>
        </div>
    </ContentPage>
);

const mapStateToProps = (state: RootState): DumbHomePageState => ({
    toastContentField: state.routing.homePage.toastContent,
});

const mapDispatchToProps = (dispatch: Dispatch): DumbHomePageCallbacks => ({
    onClickLogin: () => dispatch(
        createLogin({
            loginId: uuidV4(),
            username: "sonGoku",
            password: "1234",
            shouldRemember: false,
        }),
    ),
    onAddToast: (type: ToastTypes, content: string) => dispatch(
        createShowMessage({
            content: {
                translationId: uuidV4(),
                fallback: content,
            },
            toastType: type,
        }),
    ),
    onClickLeakReduxState: () => dispatch(createLeakReduxState()),
});

export const HomePage = connect(mapStateToProps, mapDispatchToProps)(DumbHomePage);
