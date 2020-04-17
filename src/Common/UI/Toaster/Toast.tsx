import React, {Component} from 'react';
import {Message} from "Common/UI/Toaster/Message";
import {Power1, TimelineLite} from "gsap";
import {Message as MessageData, Toast as ToastData, ToastTypes} from "Common/Domain/Toaster/Types";

export type ToastProps = {
    toast: ToastData,
    onRemoveMessage(messageId: string): void,
};

export class Toast extends Component<ToastProps> {
    private toastWrapperElement: HTMLDivElement;
    private toastElement: HTMLDivElement;
    private introAnimation: TimelineLite;
    private outroAnimation: TimelineLite;

    playIntroAnimation() {
        this.introAnimation = new TimelineLite({paused: true});
        this.introAnimation.addLabel('start');
        this.introAnimation.fromTo(this.toastWrapperElement, {height: 0}, {height: 'auto', duration: 0.5}, 'start');
        this.introAnimation.fromTo(this.toastElement, {opacity: 0, y: -25}, {opacity: 1, y: 0, marginTop: 20, duration: 0.8, ease: Power1.easeOut}, 'start');
        this.introAnimation.play();
    }

    playOutroAnimation() {
        this.outroAnimation = new TimelineLite({paused: true});
        this.outroAnimation.to(this.toastElement, {opacity: 0, y: 25, marginTop: 0, duration: 0.4, ease: Power1.easeIn});
        this.outroAnimation.to(this.toastWrapperElement, {height: 0, duration: 0.15});
        if(this.introAnimation) {
            this.introAnimation.pause();
        }
        this.outroAnimation.play();
    }

    componentDidMount() {
        if(this.props.toast.isIntroAnimationRunning) {
            this.playIntroAnimation();
        }
    }

    componentDidUpdate(prevProps: ToastProps) {
        if(
            this.props.toast.isOutroAnimationRunning
            && prevProps.toast.isOutroAnimationRunning !== this.props.toast.isOutroAnimationRunning
        ) {
            this.playOutroAnimation();
        }
    }

    createToastClassName(): string {
        let classNames = ['app-toast'];
        if(this.props.toast.type === ToastTypes.SUCCESS) {
            classNames.push('app-toast-success');
        } else if(this.props.toast.type === ToastTypes.WARNING) {
            classNames.push('app-toast-warning');
        } else if(this.props.toast.type === ToastTypes.ERROR) {
            classNames.push('app-toast-error');
        } else {
            classNames.push('app-toast-info');
        }
        return classNames.join(' ');
    }

    render() {
        return (
            <div ref={(element: HTMLDivElement) => this.toastWrapperElement = element} className="app-toast-wrapper">
                <div ref={(element: HTMLDivElement) => this.toastElement = element} className={this.createToastClassName()}>
                    {this.props.toast.messages.map((message: MessageData) => (
                        <Message
                            key={message.id}
                            message={message}
                            onRemove={() => this.props.onRemoveMessage(message.id)}
                        />
                    ))}
                </div>
            </div>
        );
    }
}