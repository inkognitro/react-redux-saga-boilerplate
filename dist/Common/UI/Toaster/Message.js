"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const CloseIcon_1 = require("Common/UI/Icon/CloseIcon");
const Icon_1 = require("Common/UI/Icon/Icon");
const gsap_1 = require("gsap");
const styled_components_1 = __importDefault(require("styled-components"));
const StyledMessage = styled_components_1.default.div `
    position: relative;
    background-color: white;
    width: 250px;
    border-bottom: 1px solid ${(props) => props.theme.colorSmoothLineOnWhite};
    
    &:last-child { border-bottom: 0; }
`;
const StyledMessageContent = styled_components_1.default.div `
    overflow: hidden;
    width: 100%;
    padding: 15px 20px 15px 20px;
`;
const StyledCloseIcon = styled_components_1.default(CloseIcon_1.CloseIcon) `
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
`;
class Message extends react_1.Component {
    playIntroAnimation() {
        this.introAnimation = new gsap_1.TimelineLite({ paused: true });
        this.introAnimation.fromTo(this.message, { height: 0 }, { height: 'auto', duration: 0.3 });
        this.introAnimation.fromTo(this.message, { x: '100%' }, { x: '0%', duration: 0.8, ease: gsap_1.Power1.easeOut });
        this.introAnimation.set(this.message, { height: '' });
        this.introAnimation.play();
    }
    playOutroAnimation() {
        this.outroAnimation = new gsap_1.TimelineLite({ paused: true, onComplete: this.props.onRemove });
        this.outroAnimation.to(this.message, { x: '-100%', duration: 0.4, ease: gsap_1.Power1.easeIn });
        this.outroAnimation.to(this.message, { height: 0, duration: 0.15 });
        this.outroAnimation.set(this.message, { display: 'none' });
        if (this.introAnimation) {
            this.introAnimation.pause();
        }
        this.outroAnimation.play();
    }
    componentDidMount() {
        if (this.props.message.isIntroAnimationRunning) {
            this.playIntroAnimation();
        }
    }
    componentDidUpdate(prevProps) {
        if (this.props.message.isOutroAnimationRunning
            && prevProps.message.isOutroAnimationRunning !== this.props.message.isOutroAnimationRunning) {
            this.playOutroAnimation();
        }
    }
    renderCloseIcon() {
        if (!this.props.message.canBeClosedManually) {
            return null;
        }
        return (react_1.default.createElement(StyledCloseIcon, { onClick: () => this.props.onRemove(), type: Icon_1.IconTypes.SECONDARY, size: Icon_1.IconSizes.SM }));
    }
    render() {
        return (react_1.default.createElement(StyledMessage, { ref: (element) => this.message = element },
            react_1.default.createElement(StyledMessageContent, null,
                this.renderCloseIcon(),
                this.props.message.content)));
    }
}
exports.Message = Message;
//# sourceMappingURL=Message.js.map