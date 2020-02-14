import './Icon.scss';

export enum IconTypes {
    INFO = 'info',
    SUCCESS = 'success',
    WARNING = 'warning',
    ERROR = 'error',
    INTERACTIVE = 'interactive',
    SECONDARY = 'secondary',
    WHITE = 'white',
}

export enum IconSizes {
    XS = 'xs',
    SM = 'sm',
    MD = 'md',
    LG = 'lg',
    XL = 'xl',
}

export type CommonIconProps = {
    type?: IconTypes,
    size?: IconSizes,
    className?: string,
    onClick?(): void,
};

type IconProps = {
    className?: string,
    onClick?(): void,
};

export function createBaseIconProps(commonProps: CommonIconProps): IconProps {
    let props = {
        className: createBaseClassNames(commonProps),
    };
    if(commonProps.onClick) {
        props = Object.assign({}, props, {
            onClick: commonProps.onClick
        });
    }
    return props;
}

function createBaseClassNames(props: CommonIconProps): string {
    let classNames = ['app-icon'];

    if(props.className) {
        classNames.push(props.className);
    }

    if(props.type === IconTypes.INFO) {
        classNames.push('app-icon-style-info');
    } else if(props.type === IconTypes.SUCCESS) {
        classNames.push('app-icon-style-success');
    } else if(props.type === IconTypes.WARNING) {
        classNames.push('app-icon-style-warning');
    } else if(props.type === IconTypes.ERROR) {
        classNames.push('app-icon-style-error');
    } else if(props.type === IconTypes.INTERACTIVE) {
        classNames.push('app-icon-style-interactive');
    } else if(props.type === IconTypes.SECONDARY) {
        classNames.push('app-icon-style-secondary');
    } else if(props.type === IconTypes.WHITE) {
        classNames.push('app-icon-style-white');
    }

    if(props.size === IconSizes.XS) {
        classNames.push('app-icon-size-xs');
    } else if(props.size === IconSizes.SM) {
        classNames.push('app-icon-size-sm');
    } else if(props.size === IconSizes.MD) {
        classNames.push('app-icon-size-md');
    } else if(props.size === IconSizes.LG) {
        classNames.push('app-icon-size-lg');
    } else if(props.size === IconSizes.XL) {
        classNames.push('app-icon-size-xl');
    }

    if(props.onClick) {
        classNames.push('app-icon-clickable');
    }

    return classNames.join(' ');
}