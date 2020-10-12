import React, { FC, ReactNode } from 'react';

export type CardProps = {
    title?: ReactNode;
    footer?: ReactNode;
};

export const Card: FC<CardProps> = (props) => (
    <div className="card">
        <div className="card-body">
            {props.title ? <h5 className="card-title text-center">{props.title}</h5> : null}
            {props.children}
        </div>
    </div>
);
