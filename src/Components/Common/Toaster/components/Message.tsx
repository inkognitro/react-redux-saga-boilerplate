import React, {Component} from 'react';
import {CloseIcon} from "App/Components/Common/Icons/CloseIcon";
import {IconSizes, IconTypes} from "App/Components/Common/Icons/types";
import {Message as MessageData} from "App/Redux/Toaster/types";
import {TimelineLite, Power1} from 'gsap';

export type MessageProps = (MessageData & {
    //onRemove(): void
});

export class Message extends Component<MessageProps> {
    private messageWrapper: HTMLDivElement;
    private introAnimation: TimelineLite;

    playIntroAnimation() {
        const messageWrapperHeight = this.messageWrapper.clientHeight;
        this.introAnimation = new TimelineLite({paused: true});
        this.introAnimation.fromTo(this.messageWrapper, {height: 0}, {height: messageWrapperHeight, duration: 0.3});
        this.introAnimation.fromTo(this.messageWrapper, {x: '100%'}, {x: '0%', duration: 0.8, ease: Power1.easeOut});
        this.introAnimation.set(this.messageWrapper, {height: ''});
        this.introAnimation.play();
    }

    componentDidMount() {
        if(this.props.isIntroAnimationEnabled) {
            this.playIntroAnimation();
        }
    }

    render() {
        return (
            <div ref={(element: HTMLDivElement) => this.messageWrapper = element} className="app-toast-message-wrapper">
                <div className="app-toast-message">
                    <CloseIcon
                        onClick={() => console.log('close')}
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