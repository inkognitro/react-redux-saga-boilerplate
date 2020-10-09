import React, { FC } from "react";
import { useSelector } from 'react-redux';
// import { ToastTypes } from "packages/common/toaster/domain";
// import { FormGroup, Label } from "packages/common/form-element/ui/web";
// import { ContentPage } from "web-app/foundation/ui";
import { RootState } from "web-app/services.factory";

export const HomePage: FC = () => {
    const toastContent = useSelector((state: RootState) => state.pages.homePage.toastContent);
    return (
        <>
            ToastContent:
            {JSON.stringify(toastContent)}
        </>
    );
    /*
    return (
        <ContentPage>
            <h3>Routing</h3>
            <div>
                <RouteLink url="/some-page-which-does-not-exist">
                    go to non existing page
                </RouteLink>
            </div>

            <br/>
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

            <br/>
            <FormGroup>
                <InputGroup
                    label={(
                        <Label formElementId={props.toastContentField.id}>
                            Toast content:
                            {' '}
                            {props.toastContentField.value}
                        </Label>
                    )}
                    formElement={props.toastContentField}
                />
                <small>
                    FYI: Without any content, the ID of the transmitted translation object will be shown in the toast
                    message.
                </small>
            </FormGroup>

            <br/>
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
                <FunctionalLink onClick={props.onClickLeakReduxState}>
                    leak redux state in console
                </FunctionalLink>
            </div>
        </ContentPage>
    );
    */
};
