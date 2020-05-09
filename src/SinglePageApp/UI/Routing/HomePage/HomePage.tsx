import React, { FC } from "react";
import { FunctionalLink, RouterLink } from "Common/UI/Base/Link";
import { ToastTypes } from "Common/Domain/Toaster/Types";
import { Dispatch } from "redux";
import { createShowMessage } from "Common/Domain/Toaster/Command/ShowMessage";
import { connect } from "react-redux";
import { FormElementGroup } from "Common/UI/FormUtils/FormElements/FormElementGroup";
import { Label } from "Common/UI/FormUtils/FormElements/Label";
import { createLogin } from "Common/Domain/Authentication/Command/Login";
import { TextField } from "Common/UI/FormUtils/FormElements/TextField";
import { createLeakReduxState } from "SinglePageApp/Domain/Routing/HomePage/Command/LeakReduxState";
import { ContentPage } from "SinglePageApp/UI/Base/PageTypes/ContentPage";
import { RootState } from "SinglePageApp/Bootstrap/ServicesFactory";
import { TextFieldState } from "Common/Domain/FormUtils/FormElements/Types";

type HomePageComponentCallbacks = {
    onClickLogin: () => void;
    onAddToast: (type: ToastTypes, content: string) => void;
    onClickLeakReduxState: () => void;
};

type HomePageComponentState = {
    toastContentField: TextFieldState;
};

type HomePageComponentProps = (HomePageComponentState & HomePageComponentCallbacks);

const HomePageComponent: FC<HomePageComponentProps> = (props) => (
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

const mapStateToProps = (state: RootState): HomePageComponentState => ({
    toastContentField: state.routing.homePage.toastContent,
});

const mapDispatchToProps = (dispatch: Dispatch): HomePageComponentCallbacks => ({
    onClickLogin: () => dispatch(
        createLogin({
            username: "sonGoku",
            password: "1234",
            shouldRemember: false,
        }),
    ),
    onAddToast: (type: ToastTypes, content: string) => dispatch(
        createShowMessage({
            content,
            toastType: type,
        }),
    ),
    onClickLeakReduxState: () => dispatch(createLeakReduxState()),
});

export const HomePage = connect(mapStateToProps, mapDispatchToProps)(HomePageComponent);
