import React, {Component} from 'react';
import {Power1, TimelineLite} from "gsap/gsap-core";
import {LoaderIcon, LoaderIconProps} from "Common/UI/Base/Icons/LoaderIcon";
import 'Common/UI/Base/Icons/LoaderIconRotating.scss';

export type LoaderIconRotatingProps = LoaderIconProps;

export class LoaderIconRotating extends Component<LoaderIconRotatingProps> {
    private iconElement: HTMLDivElement;
    private animation: TimelineLite;

    playAnimation() {
        this.animation = new TimelineLite({
            onComplete: () => {
                this.animation.restart();
            }
        });
        this.animation.to(this.iconElement, {rotation: 180, ease: Power1.easeOut, duration: 1, delay: 0.5});
        this.animation.play();
    }

    componentDidMount() {
        this.playAnimation();
    }

    render() {
        return (
            <div
                className="app-icon-loader-icon-rotating-container"
                ref={(element: HTMLDivElement) => (this.iconElement = element)}
            >
                <LoaderIcon {...this.props} className="app-icon-loader-icon-rotating" />
            </div>
        );
    }
}