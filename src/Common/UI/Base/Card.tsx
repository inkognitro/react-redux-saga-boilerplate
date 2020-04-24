import React, { FC } from "react";

export type CardProps = {
  title?: JSX.Element;
  footer?: JSX.Element;
  className?: string;
};

export const Card: FC<CardProps> = ({ className, title, children }) => ( // todo: insert footer as well
    <div className={`card${className ? ` ${className}` : ''}`}>
        <div className="card-body">
            {(title ? (<h5 className="card-title">{title}</h5>) : null)}
            {children}
        </div>
    </div>
);
