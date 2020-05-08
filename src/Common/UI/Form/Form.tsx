import React, { FC } from "react";

export const Form: FC = (props) => (
    <form onSubmit={() => false}>
        {props.children}
    </form>
);
