import React, { Component } from "react";
import { CloseIcon } from "Common/UI/Icon/CloseIcon";
import { IconSizes, IconTypes } from "Common/UI/Icon/Icon";
import { TimelineLite, Power1 } from "gsap";
import { ToastMessage as ToastMessageData } from "Common/Domain/Toaster/Types";
import styled from "styled-components";
import { StyledComponentProps } from "Common/UI/Design/Types";

const StyledMessage = styled.div`
  position: relative;
  background-color: white;
  width: 250px;
  border-bottom: 1px solid
    ${(props: StyledComponentProps) => props.theme.colorSmoothLineOnWhite};

  &:last-child {
    border-bottom: 0;
  }
`;

const StyledMessageContent = styled.div`
  overflow: hidden;
  width: 100%;
  padding: 15px 20px 15px 20px;
`;

const StyledCloseIcon = styled(CloseIcon)`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

export type MessageProps = {
  toastMessage: ToastMessageData;
  onRemove(): void;
};

export class Message extends Component<MessageProps> {
  private message: HTMLDivElement;

  private introAnimation: TimelineLite;

  private outroAnimation: TimelineLite;

  componentDidMount() {
      if (this.props.toastMessage.isIntroAnimationRunning) {
          this.playIntroAnimation();
      }
  }

  componentDidUpdate(prevProps: MessageProps) {
      if (
          this.props.toastMessage.isOutroAnimationRunning
        && prevProps.toastMessage.isOutroAnimationRunning
        !== this.props.toastMessage.isOutroAnimationRunning
      ) {
          this.playOutroAnimation();
      }
  }

  playIntroAnimation() {
      this.introAnimation = new TimelineLite({ paused: true });
      this.introAnimation.fromTo(
          this.message,
          { height: 0 },
          { height: "auto", duration: 0.3 },
      );
      this.introAnimation.fromTo(
          this.message,
          { x: "100%" },
          { x: "0%", duration: 0.8, ease: Power1.easeOut },
      );
      this.introAnimation.set(this.message, { height: "" });
      this.introAnimation.play();
  }

  playOutroAnimation() {
      this.outroAnimation = new TimelineLite({
          paused: true,
          onComplete: this.props.onRemove,
      });
      this.outroAnimation.to(this.message, {
          x: "-100%",
          duration: 0.4,
          ease: Power1.easeIn,
      });
      this.outroAnimation.to(this.message, { height: 0, duration: 0.15 });
      this.outroAnimation.set(this.message, { display: "none" });
      if (this.introAnimation) {
          this.introAnimation.pause();
      }
      this.outroAnimation.play();
  }

  renderCloseIcon() {
      if (!this.props.toastMessage.canBeClosedManually) {
          return null;
      }
      return (
          <StyledCloseIcon
              onClick={() => this.props.onRemove()}
              type={IconTypes.SECONDARY}
              size={IconSizes.SM}
          />
      );
  }

  render() { // todo: render translated message! Use react context for that
      return (
          <StyledMessage ref={(element: HTMLDivElement) => { this.message = element; }}>
              <StyledMessageContent>
                  {this.renderCloseIcon()}
                  {this.props.toastMessage.message.content.defaultText}
              </StyledMessageContent>
          </StyledMessage>
      );
  }
}
