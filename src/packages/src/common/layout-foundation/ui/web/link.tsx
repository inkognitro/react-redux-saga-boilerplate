import React, { FC } from "react";
import { useHistory } from 'react-router-dom';
import styled from "styled-components";
import { StyledComponentProps } from "packages/common/design/ui/web";

const StyledLink = styled.a`
    color: $colorInteractive;
    text-decoration: none;
    &:hover,
    &:active,
    &:focus {
        color: ${(props: StyledComponentProps) => props.theme.colorInteracting};
        text-decoration: underline;
    }
`;

type FunctionalLinkProps = {
    url?: string
    onClick?: () => void
    className?: string
};

export const FunctionalLink: FC<FunctionalLinkProps> = (props) => (
    <StyledLink
        className={props.className}
        href={props.url ? props.url : "#"}
        onClick={(event) => {
            event.preventDefault();
            if (props.onClick) {
                props.onClick();
            }
        }}
    >
        {props.children}
    </StyledLink>
);

export type RouteLinkProps = {
    url: string
    children: any
    className?: string
}

export const RouteLink: FC<RouteLinkProps> = (props) => {
    const history = useHistory();
    return (
        <StyledLink
            className={props.className}
            href={props.url ? props.url : 'javascript:void(0);'}
            onClick={(event) => {
                event.preventDefault();
                history.push(props.url);
            }}
        >
            {props.children}
        </StyledLink>
    );
};
