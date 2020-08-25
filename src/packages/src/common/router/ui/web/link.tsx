import React, { FC } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { createOpenUrl } from "packages/common/router/domain";
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
  url?: string;
  onClick: () => void;
  className?: string;
};

export const FunctionalLink: FC<FunctionalLinkProps> = (props) => (
    <StyledLink
        className={props.className}
        href={props.url ? props.url : "#"}
        onClick={(event) => {
            event.preventDefault();
            props.onClick();
        }}
    >
        {props.children}
    </StyledLink>
);

export type LinkProps = {
  url: string;
  target?: string;
  children: any;
};

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch: Dispatch, props: LinkProps) => ({
    url: props.url,
    onClick: () => dispatch(createOpenUrl({ url: props.url, target: props.target })),
});

export const RouteLink = connect(
    mapStateToProps,
    mapDispatchToProps,
)(FunctionalLink);
