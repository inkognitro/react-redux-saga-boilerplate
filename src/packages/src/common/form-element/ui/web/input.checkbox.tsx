import React, { FC, ReactNode } from "react";
import { useDispatch } from "react-redux";
import { Messages } from "packages/common/form-element/ui/web/messages";
import { CheckboxState, createFormElementStateWasChanged } from "../../domain";

type CheckboxProps = {
    data: CheckboxState
    label?: ReactNode
}

type InternalCheckboxProps = CheckboxProps & {
    onChange: (stateChanges: Partial<CheckboxState>) => void
}

const InternalCheckbox: FC<InternalCheckboxProps> = (props) => {
    const onChange = (props.data.isDisabled
        ? undefined
        : (event: React.ChangeEvent<HTMLInputElement>) => props.onChange({ value: event.target.checked })
    );
    return (
        <>
            <input
                id={props.data.id}
                type="checkbox"
                checked={props.data.value}
                onChange={onChange}
                disabled={props.data.isDisabled}
            />
            {props.label}
            {props.data.messages.length === 0 ? null : (<Messages messages={props.data.messages} />)}
        </>
    );
};

export const Checkbox: FC<CheckboxProps> = (props) => {
    const dispatch = useDispatch();
    return (
        <InternalCheckbox
            {...props}
            onChange={(stateChanges) => dispatch(createFormElementStateWasChanged(props.data, stateChanges))}
        />
    );
};
