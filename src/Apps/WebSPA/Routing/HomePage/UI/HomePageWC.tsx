import React, { FC } from "react";
import { FunctionalLinkWC, RouteLink } from "Packages/Common/Router";
import { ToastTypes, createShowMessage } from "Packages/Common/Toaster";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import {
    FormElementGroupWC, LabelWC, TextFieldWC, TextFieldState,
} from "Packages/Common/FormElement";
import { createLogin } from "Packages/Common/Authentication";
import { createLeakReduxState } from "Apps/WebSPA/Routing/HomePage";
import { ContentPage } from "Apps/WebSPA/Foundation";
import { RootState } from "Apps/WebSPA/Bootstrap/ServicesFactory";
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
        <FormElementGroupWC>
            <LabelWC title={`Toast content: ${props.toastContentField.value}`} formElementId={props.toastContentField.id} />
            <TextFieldWC data={props.toastContentField} />
        </FormElementGroupWC>

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

export const HomePageWC = connect(mapStateToProps, mapDispatchToProps)(DumbHomePage);
