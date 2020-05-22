import React, { FC } from "react";
import { FunctionalLinkWC, RouteLink } from "Packages/Common/Router/UI/LinkWC";
import { ToastTypes } from "Packages/Common/Toaster/Domain/Types";
import { Dispatch } from "redux";
import { createShowMessage } from "Packages/Common/Toaster/Domain/Command/ShowMessage";
import { connect } from "react-redux";
import { FormElementGroup } from "Packages/Common/FormElement/WebUI/FormElementGroup";
import { Label } from "Packages/Common/FormElement/WebUI/Label";
import { createLogin } from "Packages/Common/Authentication/Domain/Command/Login";
import { TextField } from "Packages/Common/FormElement/WebUI/TextField";
import { createLeakReduxState } from "Apps/WebSPA/Routing/HomePage/Domain/HomePage/Command/LeakReduxState";
import { ContentPage } from "Apps/WebSPA/LayoutFoundation/UI/PageTypes/ContentPage";
import { RootState } from "Apps/WebSPA/Bootstrap/ServicesFactory";
import { TextFieldState } from "Packages/Common/FormElement/Domain/Types";
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
        <h3>Routing</h3>
        <div>
            <RouteLink url="/some-page-which-does-not-exist">
                go to non existing page
            </RouteLink>
        </div>
        <br />
        <h3>Authentication</h3>
        <FunctionalLinkWC onClick={props.onClickLogin}>
            Login
        </FunctionalLinkWC>
        <br />

        <br />
        <h3>Toasts</h3>
        <div>
            <FunctionalLinkWC onClick={(): void => props.onAddToast(ToastTypes.SUCCESS, props.toastContentField.value)}>
                add a success toast message
            </FunctionalLinkWC>
            {' '}
            (is being closed after 3 seconds)
        </div>
        <div>
            <FunctionalLinkWC onClick={(): void => props.onAddToast(ToastTypes.INFO, props.toastContentField.value)}>
                add an info toast message
            </FunctionalLinkWC>
        </div>
        <div>
            <FunctionalLinkWC onClick={(): void => props.onAddToast(ToastTypes.WARNING, props.toastContentField.value)}>
                add a warning toast message
            </FunctionalLinkWC>
        </div>
        <div>
            <FunctionalLinkWC onClick={(): void => props.onAddToast(ToastTypes.ERROR, props.toastContentField.value)}>
                add an error toast message
            </FunctionalLinkWC>
        </div>

        <br />
        <FormElementGroup>
            <Label title={`Toast content: ${props.toastContentField.value}`} formElementId={props.toastContentField.id} />
            <TextField data={props.toastContentField} />
        </FormElementGroup>

        <br />
        <h3>Redux</h3>
        <div>
            Download
            {' '}
            <RouteLink
                url="https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd"
                target="_blank"
            >
                Redux DevTools
            </RouteLink>
            {' '}
            for a better developer experience or
            {' '}
            <FunctionalLinkWC onClick={props.onClickLeakReduxState}>
                leak redux state in console
            </FunctionalLinkWC>
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
