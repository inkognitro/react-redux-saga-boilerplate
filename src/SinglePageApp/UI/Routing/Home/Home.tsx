import React, { FC } from "react";
import { FunctionalLink, RouterLink } from "Common/UI/Base/Link";
import { ToastTypes } from "Common/Domain/Toaster/Types";
import { Dispatch } from "redux";
import { createShowMessage } from "Common/Domain/Toaster/Command/ShowMessage";
import { connect } from "react-redux";
import { FormGroup } from "Common/UI/Form/FormGroup";
import { Label } from "Common/UI/Form/Label";
import { createLogin } from "Common/Domain/Authentication/Command/Login";
import { InputFieldHelper } from "Common/UI/FormElements/InputFieldHelper";
import { createLeakReduxState } from "../../../Domain/Routing/Home/Command/LeakReduxState";
import { ContentPage } from "../../Base/PageTypes/ContentPage";
import { RootState } from "../../../Bootstrap/ServicesFactory";

type DumbHomeCallbackProps = {
  onClickLogin: () => void;
  onAddToast: (type: ToastTypes, content: string) => void;
  onClickLeakReduxState: () => void;
};

type DumbHomeStateProps = {
  toastContent: string;
};

type DumbHomeProps = DumbHomeStateProps & DumbHomeCallbackProps;

const DumbHome: FC<DumbHomeProps> = (props) => (
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
            <FunctionalLink onClick={(): void => props.onAddToast(ToastTypes.SUCCESS, props.toastContent)}>
                add a success toast message
            </FunctionalLink>
            {' '}
            (is being closed after 3 seconds)
        </div>
        <div>
            <FunctionalLink onClick={(): void => props.onAddToast(ToastTypes.INFO, props.toastContent)}>
                add an info toast message
            </FunctionalLink>
        </div>
        <div>
            <FunctionalLink onClick={(): void => props.onAddToast(ToastTypes.WARNING, props.toastContent)}>
                add a warning toast message
            </FunctionalLink>
        </div>
        <div>
            <FunctionalLink onClick={(): void => props.onAddToast(ToastTypes.ERROR, props.toastContent)}>
                add an error toast message
            </FunctionalLink>
        </div>

        <br />
        <FormGroup>
            <Label title={`Toast content: ${props.toastContent}`} formElementId="toastContentTextField" />
            <InputFieldHelper stateSelector={(state: RootState) => state.routing.home.toastContentField} />
        </FormGroup>

        <br />
        <h3>Redux</h3>
        <div>
            <FunctionalLink onClick={props.onClickLeakReduxState}>
                leak redux state in console
            </FunctionalLink>
        </div>
    </ContentPage>
);

const mapStateToProps = (state: RootState): DumbHomeStateProps => ({
    toastContent: state.routing.home.toastContentField.value,
});

const mapDispatchToProps = (dispatch: Dispatch): DumbHomeCallbackProps => ({
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

export const Home = connect(mapStateToProps, mapDispatchToProps)(DumbHome);
