import React, { FC } from "react";
import { RouterWC as CommonRouter } from "Packages/Common/Router/Web";
import { History } from "history";
import { specification } from "./Types";

export const RouterWC: FC<{ history: History }> = (props) => (
    <CommonRouter
        specification={specification}
        history={props.history}
    />
);
