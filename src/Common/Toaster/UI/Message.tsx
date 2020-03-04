import React, {Component} from 'react';
import {CloseIcon} from "Common/Layout/UI/Icons/CloseIcon";
import {IconSizes, IconTypes} from "Common/Layout/UI/Icons/Icon";
import {TimelineLite, Power1} from 'gsap';
import {Message as MessageData} from "Common/Toaster/Domain/Types";

export type MessageProps = (MessageData & {
    shouldPlayOutroAnimationOnCloseClick: boolean,
    onRemove(): void
});

export class Message extends Component<MessageProps> {
    private message: HTMLDivElement;
    private introAnimation: TimelineLite;
    private outroAnimation: TimelineLite;

    playIntroAnimation() {
        this.introAnimation = new TimelineLite({paused: true});
        this.introAnimation.fromTo(this.message, {height: 0}, {height: 'auto', duration: 0.3});
        this.introAnimation.fromTo(this.message, {x: '100%'}, {x: '0%', duration: 0.8, ease: Power1.easeOut});
        this.introAnimation.set(this.message, {height: ''});
        this.introAnimation.play();
    }

    playOutroAnimation() {
        this.outroAnimation = new TimelineLite({paused: true, onComplete: this.props.onRemove});
        this.outroAnimation.to(this.message,  {x: '-100%', duration: 0.4, ease: Power1.easeIn});
        this.outroAnimation.to(this.message,  {height: 0, duration: 0.15});
        this.outroAnimation.set(this.message,  {display: 'none'});
        this.outroAnimation.play();
    }

    componentDidMount() {
        if(this.props.isIntroAnimationEnabled) {
            this.playIntroAnimation();
        }
    }

    close() {
        if(this.props.shouldPlayOutroAnimationOnCloseClick) {
            this.playOutroAnimation();
            return;
        }
        this.props.onRemove();
    }

    render() {
        return (
            <div ref={(element: HTMLDivElement) => this.message = element} className="app-toast-message">
                <div className="app-toast-message-content">
                    <CloseIcon
                        onClick={() => this.close()}
                        type={IconTypes.SECONDARY}
                        size={IconSizes.SM}
                        className="app-toast-message-close-icon"
                    />
                    {this.props.content}
                </div>
            </div>
        );
    }
}