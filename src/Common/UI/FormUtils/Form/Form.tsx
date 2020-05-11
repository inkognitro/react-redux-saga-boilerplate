import React, { FC } from "react";
import { FormState } from "Common/Domain/FormUtils/Form/Types";
import styled from "styled-components";

// browsers do require a submit button inside the form element for dispatching a submit on enter key press
const InvisibleSubmitButton = styled.button`
  display: none;
`;

export type FormProps = {
    data: FormState
    onSubmit: (data: FormState) => void
}

export const Form: FC<FormProps> = (props) => (
    <form
        onSubmit={(event: React.FormEvent): void => {
            event.preventDefault();
            props.onSubmit(props.data);
        }}
    >
        {props.children}
        <InvisibleSubmitButton type="submit">SUBMIT</InvisibleSubmitButton>
    </form>
);
