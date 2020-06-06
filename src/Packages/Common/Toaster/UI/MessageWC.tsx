import React, { Component } from "react";
import { CloseIconWC } from "Packages/Common/Icon/UI/CloseIconWC";
import { IconSizes, IconTypes } from "Packages/Common/Icon/UI/IconWC";
import { TimelineLite, Power1 } from "gsap";
import styled from "styled-components";
import { StyledWCProps } from "Packages/Common/Design";
import { TranslatedTextWC } from "Packages/Common/Translator";
import { Message } from "../Domain/Types";

const StyledMessage = styled.div`
  position: relative;
  background-color: white;
  width: 250px;
  border-bottom: 1px solid ${(props: StyledWCProps) => props.theme.colorSmoothLineOnWhite};

  &:last-child { border-bottom: 0; }
`;

const StyledMessageContent = styled.div`
  overflow: hidden;
  width: 100%;
  padding: 15px 20px 15px 20px;
`;

const StyledCloseIcon = styled(CloseIconWC)`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

export type MessageWCProps = {
    message: Message
    onRemove(): void
};

export class MessageWC extends Component<MessageWCProps> {
  private message: HTMLDivElement;

  private introAnimation: TimelineLite;

  private outroAnimation: TimelineLite;

  componentDidMount() {
      if (this.props.message.isIntroAnimationRunning) {
          this.playIntroAnimation();
      }
  }

  componentDidUpdate(prevProps: MessageWCProps) {
      if (
          this.props.message.isOutroAnimationRunning
        && prevProps.message.isOutroAnimationRunning
        !== this.props.message.isOutroAnimationRunning
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
          { x: "0%", duration: 0.5, ease: Power1.easeOut },
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
      if (!this.props.message.canBeClosedManually) {
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

  render() {
      return (
          <StyledMessage ref={(element: HTMLDivElement) => { this.message = element; }}>
              <StyledMessageContent>
                  {this.renderCloseIcon()}
                  <TranslatedTextWC translation={this.props.message.content} />
              </StyledMessageContent>
          </StyledMessage>
      );
  }
}
