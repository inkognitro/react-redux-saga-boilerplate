import React, { FC } from "react";
import { FunctionalLinkWC, RouteLinkWC } from "Packages/Common/Router/Web";
import { ToastTypes, createShowMessage } from "Packages/Common/Toaster/Domain";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { TextFieldState } from "Packages/Common/FormElement/Domain";
import { FormGroupWC, LabelWC, ConnectedTextFieldWC } from "Packages/Common/FormElement/Web";
import { createLeakReduxState } from "WebApp/Routing/HomePage";
import { ContentPage } from "WebApp/Foundation/UI";
import { RootState } from "WebApp/ServicesFactory";
import uuidV4 from 'uuid/v4';

type DumbHomePageCallbacks = {
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
            <RouteLinkWC url="/some-page-which-does-not-exist">
                go to non existing page
            </RouteLinkWC>
        </div>

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
        <FormGroupWC>
            <LabelWC title={`Toast content: ${props.toastContentField.value}`} formElementId={props.toastContentField.id} />
            <ConnectedTextFieldWC data={props.toastContentField} />
            <small>
                FYI: Without any content, the ID of the transmitted translation object will be shown in the toast message.
            </small>
        </FormGroupWC>

        <br />
        <h3>Redux</h3>
        <div>
            Download
            {' '}
            <RouteLinkWC
                url="https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd"
                target="_blank"
            >
                Redux DevTools
            </RouteLinkWC>
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
