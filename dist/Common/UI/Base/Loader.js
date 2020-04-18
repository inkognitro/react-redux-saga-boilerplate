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
const AlignedArea_1 = require("Common/UI/Base/AlignedArea");
const gsap_1 = require("gsap");
const Icon_1 = require("Common/UI/Icon/Icon");
const styled_components_1 = __importDefault(require("styled-components"));
const LoaderIcon_1 = require("Common/UI/Icon/LoaderIcon");
const StyledLoaderDiv = styled_components_1.default.div `
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    display: none;
`;
class Loader extends react_1.Component {
    componentDidMount() {
        this.createFadeInAnimation();
        this.triggerAnimationBehaviour(null);
    }
    componentDidUpdate(prevProps) {
        this.triggerAnimationBehaviour(prevProps);
    }
    playAnimationAccordingToVisibility(isVisible) {
        if (isVisible) {
            this.fadeInAnimation.play();
            return;
        }
        this.fadeInAnimation.reverse();
    }
    triggerAnimationBehaviour(prevProps) {
        if (prevProps && prevProps.isVisible === this.props.isVisible) {
            return;
        }
        this.playAnimationAccordingToVisibility(this.props.isVisible);
    }
    createFadeInAnimation() {
        this.fadeInAnimation = new gsap_1.TimelineLite({ paused: true });
        this.fadeInAnimation.fromTo(this.loader, { display: 'none' }, { display: 'block', duration: 0.01 });
        this.fadeInAnimation.fromTo(this.loader, { opacity: 0 }, { delay: 0.5, opacity: 1, duration: 0.25 });
    }
    render() {
        return (react_1.default.createElement(StyledLoaderDiv, { ref: (element) => this.loader = element },
            react_1.default.createElement(AlignedArea_1.AlignedArea, { horizontalAlign: AlignedArea_1.horizontalAligns.CENTER, verticalAlign: AlignedArea_1.verticalAligns.MIDDLE },
                react_1.default.createElement(LoaderIcon_1.LoaderIcon, { size: Icon_1.IconSizes.LG, type: Icon_1.IconTypes.WHITE }))));
    }
}
exports.Loader = Loader;
//# sourceMappingURL=Loader.js.map