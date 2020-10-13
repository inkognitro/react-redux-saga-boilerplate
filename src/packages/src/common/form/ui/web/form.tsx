import React, { FC } from 'react';
import styled from 'styled-components';

// browsers do require a submit button inside the form element for dispatching a submit on enter key press
const InvisibleSubmitButton = styled.button`
    display: none;
`;

export type FormProps = {
    onSubmit: () => void;
};

export const Form: FC<FormProps> = (props) => (
    <form
        onSubmit={(event: React.FormEvent): void => {
            event.preventDefault();
            props.onSubmit();
        }}>
        {props.children}
        <InvisibleSubmitButton type="submit">SUBMIT</InvisibleSubmitButton>
    </form>
);
