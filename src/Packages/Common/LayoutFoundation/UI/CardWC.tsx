import React, { FC, ReactNode } from "react";

export type CardWCProps = {
  title?: ReactNode;
  footer?: ReactNode;
};

export const CardWC: FC<CardWCProps> = (props) => (
    <div className="card">
        <div className="card-body">
            {(props.title ? (<h5 className="card-title">{props.title}</h5>) : null)}
            {props.children}
        </div>
    </div>
);
