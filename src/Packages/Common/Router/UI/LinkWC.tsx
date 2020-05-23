import React, { FC } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { createOpenUrl } from "Packages/Common/Router";
import styled from "styled-components";
import { StyledWCProps } from "Packages/Common/Design";

const StyledLink = styled.a`
  color: $colorInteractive;
  text-decoration: none;
  &:hover,
  &:active,
  &:focus {
    color: ${(props: StyledWCProps) => props.theme.colorInteracting};
    text-decoration: underline;
  }
`;

type FunctionalLinkWCProps = {
  url?: string;
  onClick: () => void;
  className?: string;
};

export const FunctionalLinkWC: FC<FunctionalLinkWCProps> = (props) => (
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
)(FunctionalLinkWC);
