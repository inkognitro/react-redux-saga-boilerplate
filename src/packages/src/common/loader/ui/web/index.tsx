import React, { Component } from "react";
import { AlignedArea, horizontalAligns, verticalAligns } from "packages/common/layout-foundation/ui/web";
import { TimelineLite } from "gsap";
import styled from "styled-components";
import { TranslatedText } from "packages/common/translator/ui/web";
import { TranslationIds } from "packages/common/entity-base/common-types";

const StyledLoaderDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: none;
`;

const StyledLoaderTextDiv = styled.div`
  padding-top: 40px;
  color: white;
`;

export type LoaderState = {
    isVisible: boolean;
};

export type LoaderProps = LoaderState;

export class Loader extends Component<LoaderProps> {
    private fadeInAnimation: TimelineLite;

    private loader: HTMLDivElement;

    componentDidMount() {
        this.createFadeInAnimation();
        this.triggerAnimationBehaviour(null);
    }

    componentDidUpdate(prevProps: LoaderProps): void {
        this.triggerAnimationBehaviour(prevProps);
    }

    playAnimationAccordingToVisibility(isVisible: boolean): void {
        if (isVisible) {
            this.fadeInAnimation.play();
            return;
        }
        this.fadeInAnimation.reverse();
    }

    triggerAnimationBehaviour(prevProps: null | LoaderProps): void {
        if (prevProps && prevProps.isVisible === this.props.isVisible) {
            return;
        }
        this.playAnimationAccordingToVisibility(this.props.isVisible);
    }

    createFadeInAnimation() {
        this.fadeInAnimation = new TimelineLite({ paused: true });
        this.fadeInAnimation.fromTo(
            this.loader,
            { display: "none" },
            { display: "block", duration: 0.01 },
        );
        this.fadeInAnimation.fromTo(
            this.loader,
            { opacity: 0 },
            { delay: 0.5, opacity: 1, duration: 0.25 },
        );
    }

    render() {
        return (
            <StyledLoaderDiv ref={(element: HTMLDivElement) => { this.loader = element; }}>
                <AlignedArea horizontalAlign={horizontalAligns.CENTER} verticalAlign={verticalAligns.TOP}>
                    <StyledLoaderTextDiv>
                        <TranslatedText translation={{ translationId: TranslationIds.LOADING }} />
                    </StyledLoaderTextDiv>
                </AlignedArea>
            </StyledLoaderDiv>
        );
    }
}
