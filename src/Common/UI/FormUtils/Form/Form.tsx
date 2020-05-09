import React, { FC } from "react";
import { FormState } from "Common/Domain/FormUtils/Form/Types";

export type FormProps = {
    data: FormState
    onSubmit: (data: FormState) => void
}

export const Form: FC<FormProps> = (props) => (
    <form
        onSubmit={(event: React.FormEvent): void => {
            console.log('sdflkjsdfkljsdf');

            event.preventDefault();
            props.onSubmit(props.data);
        }}
    >
        {props.children}
    </form>
);
