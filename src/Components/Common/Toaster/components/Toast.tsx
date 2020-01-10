import React, {Component} from 'react';
import {Message} from "./Message";
import {Toast as ToastData} from "App/Redux/Toaster/types";
import {Message as MessageData} from "App/Redux/Toaster/types";
import {Power1, TimelineLite} from "gsap/gsap-core";

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
    //onRemove(): void,
    //onRemoveMessage(messageId: string): void,
});

export class Toast extends Component<ToastProps> {
    private toastWrapper: HTMLDivElement;
    private toast: HTMLDivElement;
    private introAnimation: TimelineLite;

    playIntroAnimation() {
        this.introAnimation = new TimelineLite({paused: true});
        this.introAnimation.fromTo(this.toastWrapper, {height: 0}, {height: 'auto', duration: 0.3});
        this.introAnimation.fromTo(this.toast, {opacity: 0, y: -25}, {opacity: 1, y: 0, duration: 0.8, ease: Power1.easeOut});
        this.introAnimation.play();
    }

    componentDidMount() {
        this.playIntroAnimation();
    }

    render() {
        return (
            <div ref={(element: HTMLDivElement) => this.toastWrapper = element} className="app-toast-wrapper">
                <div ref={(element: HTMLDivElement) => this.toast = element} className={getToastClassName(this.props.type)}>
                    {this.props.messages.map((messageData: MessageData) => (
                        <Message
                            key={messageData.id}
                            {...messageData}
                        />
                    ))}
                </div>
            </div>
        );
    }
}