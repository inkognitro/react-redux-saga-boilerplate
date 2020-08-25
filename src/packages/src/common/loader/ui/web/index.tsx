import React, { Component } from "react";
import { AlignedAreaWC, horizontalAligns, verticalAligns } from "packages/common/LayoutFoundation/Web";
import { TimelineLite } from "gsap";
import styled from "styled-components";
import { TranslatedText } from "packages/common/translator/ui/web";
import { TranslationIds } from "packages/entity/common-types";

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

export type LoaderWCState = {
    isVisible: boolean;
};

export type LoaderWCProps = LoaderWCState;

export class LoaderWC extends Component<LoaderWCProps> {
    private fadeInAnimation: TimelineLite;

    private loader: HTMLDivElement;

    componentDidMount() {
        this.createFadeInAnimation();
        this.triggerAnimationBehaviour(null);
    }

    componentDidUpdate(prevProps: LoaderWCProps): void {
        this.triggerAnimationBehaviour(prevProps);
    }

    playAnimationAccordingToVisibility(isVisible: boolean): void {
        if (isVisible) {
            this.fadeInAnimation.play();
            return;
        }
        this.fadeInAnimation.reverse();
    }

    triggerAnimationBehaviour(prevProps: null | LoaderWCProps): void {
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
                <AlignedAreaWC horizontalAlign={horizontalAligns.CENTER} verticalAlign={verticalAligns.TOP}>
                    <StyledLoaderTextDiv>
                        <TranslatedText translation={{ translationId: TranslationIds.LOADING }} />
                    </StyledLoaderTextDiv>
                </AlignedAreaWC>
            </StyledLoaderDiv>
        );
    }
}
