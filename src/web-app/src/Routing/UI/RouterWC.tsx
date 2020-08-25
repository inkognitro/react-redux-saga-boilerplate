import React, { FC } from "react";
import { Router as CommonRouter } from "packages/common/router/ui/web";
import { History } from "history";
import { specification } from "./Types";

export const RouterWC: FC<{ history: History }> = (props) => (
    <CommonRouter
        specification={specification}
        history={props.history}
    />
);
