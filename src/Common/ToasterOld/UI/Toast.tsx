import React, {Component} from 'react';
import {Message} from "./Message";
import {Power1, TimelineLite} from "gsap/gsap-core";
import {Message as MessageData, Toast as ToastData} from "Common/ToasterOld/Domain/Types";

function getToastClassName(type: string): string {
    let classNames = ['app-toast'];
    if(type === 'success') {
        classNames.push('app-toast-success');
    } else if(type === 'warning') {
        classNames.push('app-toast-warning');
    } else if(type === 'error') {
        classNames.push('app-toast-error');
    } else {
        classNames.push('app-toast-info');
    }
    return classNames.join(' ');
}

export type ToastProps = (ToastData & {
    onRemove(): void,
    onRemoveMessage(messageId: string): void,
    onBlockMessageReceiving(): void,
});

export class Toast extends Component<ToastProps> {
    private toastWrapper: HTMLDivElement;
    private toast: HTMLDivElement;
    private introAnimation: TimelineLite;
    private outroAnimation: TimelineLite;

    playIntroAnimation() {
        this.introAnimation = new TimelineLite({paused: true});
        this.introAnimation.addLabel('start');
        this.introAnimation.fromTo(this.toastWrapper, {height: 0}, {height: 'auto', duration: 0.5}, 'start');
        this.introAnimation.fromTo(this.toast, {opacity: 0, y: -25}, {opacity: 1, y: 0, marginTop: 20, duration: 0.8, ease: Power1.easeOut}, 'start');
        this.introAnimation.play();
    }

    playOutroAnimation() {
        this.outroAnimation = new TimelineLite({paused: true, onComplete: this.props.onRemove});
        this.outroAnimation.to(this.toast, {opacity: 0, y: 25, marginTop: 0, duration: 0.4, ease: Power1.easeIn});
        this.outroAnimation.to(this.toastWrapper, {height: 0, duration: 0.15}, );
        this.outroAnimation.play();
    }

    componentDidMount() {
        this.playIntroAnimation();
    }

    shouldRemoveToastOnClickCloseMessage() {
        return (this.props.messages.length === 1);
    }

    close() {
        this.props.onBlockMessageReceiving();
        this.playOutroAnimation();
    }

    removeMessage(messageId: string) {
        if(this.shouldRemoveToastOnClickCloseMessage()) {
            this.close();
            return;
        }
        this.props.onRemoveMessage(messageId);
    }

    render() {
        return (
            <div ref={(element: HTMLDivElement) => this.toastWrapper = element} className="app-toast-wrapper">
                <div ref={(element: HTMLDivElement) => this.toast = element} className={getToastClassName(this.props.type)}>
                    {this.props.messages.map((messageData: MessageData) => (
                        <Message
                            {...messageData}
                            key={messageData.id}
                            shouldPlayOutroAnimationOnCloseClick={!this.shouldRemoveToastOnClickCloseMessage()}
                            onRemove={() => this.removeMessage(messageData.id)}
                        />
                    ))}
                </div>
            </div>
        );
    }
}