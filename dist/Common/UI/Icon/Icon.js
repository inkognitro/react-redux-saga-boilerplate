"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const styled_components_1 = __importDefault(require("styled-components"));
var IconTypes;
(function (IconTypes) {
    IconTypes["INFO"] = "info";
    IconTypes["SUCCESS"] = "success";
    IconTypes["WARNING"] = "warning";
    IconTypes["ERROR"] = "error";
    IconTypes["INTERACTIVE"] = "interactive";
    IconTypes["SECONDARY"] = "secondary";
    IconTypes["WHITE"] = "white";
})(IconTypes = exports.IconTypes || (exports.IconTypes = {}));
var IconSizes;
(function (IconSizes) {
    IconSizes["XS"] = "xs";
    IconSizes["SM"] = "sm";
    IconSizes["MD"] = "md";
    IconSizes["LG"] = "lg";
    IconSizes["XL"] = "xl";
})(IconSizes = exports.IconSizes || (exports.IconSizes = {}));
var VerticalAligns;
(function (VerticalAligns) {
    VerticalAligns["TOP"] = "top";
    VerticalAligns["CENTER"] = "center";
    VerticalAligns["BOTTOM"] = "bottom";
})(VerticalAligns = exports.VerticalAligns || (exports.VerticalAligns = {}));
function createStyledIcon(component) {
    return styled_components_1.default(component) `
        color: ${(props) => props.theme.colorText};
        font-size: 24px !important;
        
        &.style-info {color: ${(props) => props.theme.colorInfo};}
        &.style-success {color: ${(props) => props.theme.colorSuccess};}
        &.style-warning {color: ${(props) => props.theme.colorWarning};}
        &.style-error {color: ${(props) => props.theme.colorError};}
        &.style-interactive {color: ${(props) => props.theme.colorInteractive};}
        &.style-secondary {color: ${(props) => props.theme.colorSecondary};}
        &.style-white {color: white;}
        
        &.size-xs {font-size: 18px !important;}
        &.size-sm {font-size: 20px !important;}
        &.size-md {font-size: 24px !important;}
        &.size-lg {font-size: 30px !important;}
        &.size-xl {font-size: 40px !important;}
        
        &.vertical-align-top {vertical-align: top;}
        &.vertical-align-center {vertical-align: center; }
        &.vertical-align-bottom {vertical-align: bottom; }
        
        &.clickable {
            cursor: pointer;
            &:hover, &:active, &:focus {
                color: ${(props) => props.theme.colorInteractive};
                text-decoration: underline;
            }
        }
    `;
}
exports.createStyledIcon = createStyledIcon;
function createBaseIconProps(commonProps) {
    let props = {
        className: createBaseClassNames(commonProps),
    };
    if (commonProps.onClick) {
        props = Object.assign({}, props, {
            onClick: commonProps.onClick
        });
    }
    return props;
}
exports.createBaseIconProps = createBaseIconProps;
function createBaseClassNames(props) {
    let classNames = [];
    if (props.type === IconTypes.INFO) {
        classNames.push('style-info');
    }
    else if (props.type === IconTypes.SUCCESS) {
        classNames.push('style-success');
    }
    else if (props.type === IconTypes.WARNING) {
        classNames.push('style-warning');
    }
    else if (props.type === IconTypes.ERROR) {
        classNames.push('style-error');
    }
    else if (props.type === IconTypes.INTERACTIVE) {
        classNames.push('style-interactive');
    }
    else if (props.type === IconTypes.SECONDARY) {
        classNames.push('style-secondary');
    }
    else if (props.type === IconTypes.WHITE) {
        classNames.push('style-white');
    }
    if (props.size === IconSizes.XS) {
        classNames.push('size-xs');
    }
    else if (props.size === IconSizes.SM) {
        classNames.push('size-sm');
    }
    else if (props.size === IconSizes.MD) {
        classNames.push('size-md');
    }
    else if (props.size === IconSizes.LG) {
        classNames.push('size-lg');
    }
    else if (props.size === IconSizes.XL) {
        classNames.push('size-xl');
    }
    if (props.verticalAlign === VerticalAligns.TOP) {
        classNames.push('vertical-align-top');
    }
    else if (props.verticalAlign === VerticalAligns.BOTTOM) {
        classNames.push('vertical-align-bottom');
    }
    else {
        classNames.push('vertical-align-center');
    }
    if (props.onClick) {
        classNames.push('clickable');
    }
    if (props.className) {
        classNames.push(props.className);
    }
    return classNames.join(' ');
}
//# sourceMappingURL=Icon.js.map