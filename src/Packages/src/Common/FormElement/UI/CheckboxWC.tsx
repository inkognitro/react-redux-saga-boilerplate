import React, { FC, Fragment } from "react";
import { CheckboxState, createChangeFormElementState, MessagesWC } from "Packages/Common/FormElement";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import {
    ConnectedFormElementWCProps, FormElementWCCallbacks, FormElementWCProps, FormElementWCState,
} from "./Types";

type DumbCheckboxWCProps = FormElementWCProps<CheckboxState>
const DumbCheckboxWC: FC<DumbCheckboxWCProps> = (props) => {
    const onChange = props.data.readOnly
        ? undefined
        : (event: React.ChangeEvent<HTMLInputElement>) => {
            props.onChange(props.data, {
                value: event.target.checked,
            });
        };
    return (
        <Fragment>
            <input
                id={props.data.id}
                type="checkbox"
                checked={props.data.value}
                onChange={onChange}
                readOnly={props.data.readOnly}
            />
            <MessagesWC messages={props.data.messages} />
        </Fragment>
    );
};

const mapStateToProps = (_: any, props: ConnectedFormElementWCProps<CheckboxState>): FormElementWCState<CheckboxState> => ({
    data: props.data,
});

const mapDispatchToProps = (dispatch: Dispatch): FormElementWCCallbacks<CheckboxState> => ({
    onChange: (state: CheckboxState, stateChanges: Partial<CheckboxState>) => dispatch(
        createChangeFormElementState(state, stateChanges),
    ),
});

export const CheckboxWC = connect(mapStateToProps, mapDispatchToProps)(DumbCheckboxWC);
