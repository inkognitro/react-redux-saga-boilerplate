import React, { FunctionComponent } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { createOpenUrl } from "Common/Domain/Router/Commands/OpenUrl";
import styled from "styled-components";
import { StyledComponentProps } from "Common/UI/Design/Types";

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

export const FunctionalLink: FunctionComponent<FunctionalLinkProps> = (
    props,
) => (
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

export type RouterLinkProps = {
  url: string;
  target?: string;
  children: any;
};

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch: Dispatch, props: RouterLinkProps) => ({
    url: props.url,
    onClick: () => dispatch(createOpenUrl({ url: props.url, target: props.target })),
});

export const RouterLink = connect(
    mapStateToProps,
    mapDispatchToProps,
)(FunctionalLink);
