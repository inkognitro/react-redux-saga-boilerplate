import React, { FC, ReactNode } from "react";

export type CardProps = {
  title?: ReactNode;
  footer?: ReactNode;
};

export const Card: FC<CardProps> = (props) => ( // todo: insert footer as well
    <div className="card">
        <div className="card-body">
            {(props.title ? (<h5 className="card-title">{props.title}</h5>) : null)}
            {props.children}
        </div>
    </div>
);
