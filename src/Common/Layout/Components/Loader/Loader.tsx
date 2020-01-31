import React, {Component} from 'react';
import {AlignedArea, horizontalAligns, verticalAligns} from "Common/Layout/Components/AlignedArea/AlignedArea";
import {TimelineLite} from "gsap/gsap-core";
import {IconSizes, IconTypes} from "Common/Layout/Components/Icons/Icon";
import {LoaderIconRotating} from "Common/Layout/Components/Icons/LoaderIconRotating";
import './Loader.scss';

export type LoaderProps = {
    isVisible: boolean,
};

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
        if(isVisible) {
            this.fadeInAnimation.play();
            return;
        }
        this.fadeInAnimation.reverse();
    }

    triggerAnimationBehaviour(prevProps: (null | LoaderProps)): void {
        if(prevProps && prevProps.isVisible === this.props.isVisible) {
            return;
        }
        this.playAnimationAccordingToVisibility(this.props.isVisible);
    }

    createFadeInAnimation() {
        this.fadeInAnimation = new TimelineLite({paused: true});
        this.fadeInAnimation.fromTo(this.loader, {display: 'none'}, {display: 'block', duration: 0.01});
        this.fadeInAnimation.fromTo(this.loader, {opacity: 0}, {delay: 0.5, opacity: 1, duration: 0.25});
    }

    render() {
        return (
            <div ref={(element: HTMLDivElement) => this.loader = element} className="app-loader">
                <AlignedArea horizontalAlign={horizontalAligns.CENTER} verticalAlign={verticalAligns.MIDDLE}>
                    <LoaderIconRotating size={IconSizes.LG} type={IconTypes.WHITE} />
                </AlignedArea>
            </div>
        );
    }
}