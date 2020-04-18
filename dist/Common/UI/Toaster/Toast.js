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
const Message_1 = require("Common/UI/Toaster/Message");
const gsap_1 = require("gsap");
const Types_1 = require("Common/Domain/Toaster/Types");
const styled_components_1 = __importDefault(require("styled-components"));
const StyleFactory_1 = require("Common/UI/Design/StyleFactory");
const StyledToast = styled_components_1.default.div `
    margin-top: 20px;
    background-color: white;
    margin-right: 20px;
    border-top: 3px solid ${(props) => props.theme.colorPrimary};
    overflow: hidden;
    ${StyleFactory_1.createBoxShadowCss()}
    &.info { border-color: ${(props) => props.theme.colorInfo}; }
    &.success { border-color: ${(props) => props.theme.colorSuccess}; }
    &.warning { border-color: ${(props) => props.theme.colorWarning}; }
    &.error { border-color: ${(props) => props.theme.colorError}; }
`;
class Toast extends react_1.Component {
    playIntroAnimation() {
        this.introAnimation = new gsap_1.TimelineLite({ paused: true });
        this.introAnimation.addLabel('start');
        this.introAnimation.fromTo(this.toastWrapperElement, { height: 0 }, { height: 'auto', duration: 0.5 }, 'start');
        this.introAnimation.fromTo(this.toastElement, { opacity: 0, y: -25 }, { opacity: 1, y: 0, marginTop: 20, duration: 0.8, ease: gsap_1.Power1.easeOut }, 'start');
        this.introAnimation.play();
    }
    playOutroAnimation() {
        this.outroAnimation = new gsap_1.TimelineLite({ paused: true });
        this.outroAnimation.to(this.toastElement, { opacity: 0, y: 25, marginTop: 0, duration: 0.4, ease: gsap_1.Power1.easeIn });
        this.outroAnimation.to(this.toastWrapperElement, { height: 0, duration: 0.15 });
        if (this.introAnimation) {
            this.introAnimation.pause();
        }
        this.outroAnimation.play();
    }
    componentDidMount() {
        if (this.props.toast.isIntroAnimationRunning) {
            this.playIntroAnimation();
        }
    }
    componentDidUpdate(prevProps) {
        if (this.props.toast.isOutroAnimationRunning
            && prevProps.toast.isOutroAnimationRunning !== this.props.toast.isOutroAnimationRunning) {
            this.playOutroAnimation();
        }
    }
    createToastTypeClassName() {
        if (this.props.toast.type === Types_1.ToastTypes.SUCCESS) {
            return 'success';
        }
        if (this.props.toast.type === Types_1.ToastTypes.WARNING) {
            return 'warning';
        }
        if (this.props.toast.type === Types_1.ToastTypes.ERROR) {
            return 'error';
        }
        return 'info';
    }
    render() {
        return (react_1.default.createElement("div", { ref: (element) => this.toastWrapperElement = element, className: "app-toast-wrapper" },
            react_1.default.createElement(StyledToast, { ref: (element) => this.toastElement = element, className: this.createToastTypeClassName() }, this.props.toast.messages.map((message) => (react_1.default.createElement(Message_1.Message, { key: message.id, message: message, onRemove: () => this.props.onRemoveMessage(message.id) }))))));
    }
}
exports.Toast = Toast;
//# sourceMappingURL=Toast.js.map