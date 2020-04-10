import React, {Component} from 'react';
import {CloseIcon} from "Common/UI/Base/Icon/CloseIcon";
import {IconSizes, IconTypes} from "Common/UI/Base/Icon/Icon";
import {TimelineLite, Power1} from 'gsap';
import {Message as MessageData} from "Common/Domain/Toaster/Types";

export type MessageProps = (MessageData & {
    message: MessageData,
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
        if(this.introAnimation) {
            this.introAnimation.pause();
        }
        this.outroAnimation.play();
    }

    componentDidMount() {
        if(this.props.message.isIntroAnimationRunning) {
            this.playIntroAnimation();
        }
    }

    componentDidUpdate(prevProps: MessageProps) {
        if(
            this.props.message.isOutroAnimationRunning
            && prevProps.message.isOutroAnimationRunning !== this.props.message.isOutroAnimationRunning
        ) {
            this.playOutroAnimation();
        }
    }

    renderCloseIcon() {
        if(!this.props.message.canBeClosedManually) {
            return null;
        }
        return (
            <CloseIcon
                onClick={() => this.props.onRemove()}
                type={IconTypes.SECONDARY}
                size={IconSizes.SM}
                className="app-toast-message-close-icon"
            />
        );
    }

    render() {
        return (
            <div ref={(element: HTMLDivElement) => this.message = element} className="app-toast-message">
                <div className="app-toast-message-content">
                    {this.renderCloseIcon()}
                    {this.props.message.content}
                </div>
            </div>
        );
    }
}