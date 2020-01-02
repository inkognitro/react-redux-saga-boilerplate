import './Icon.scss';

export enum IconTypes {
    INFO = 'info',
    SUCCESS = 'success',
    WARNING = 'warning',
    ERROR = 'error',
}

export enum IconSizes {
    NORMAL = 'normal',
    SMALL = 'small',
    BIG = 'big',
}

export type CommonIconProps = {
    type?: IconTypes,
    size?: IconSizes,
};

export function createBaseClassNames(props: CommonIconProps): string {
    let classNames = ['app-icon'];

    if(props.type === IconTypes.INFO) {
        classNames.push('app-icon-style-info');
    } else if(props.type === IconTypes.SUCCESS) {
        classNames.push('app-icon-style-success');
    } else if(props.type === IconTypes.WARNING) {
        classNames.push('app-icon-style-warning');
    } else if(props.type === IconTypes.ERROR) {
        classNames.push('app-icon-style-error');
    }

    if(props.size === IconSizes.NORMAL) {
        classNames.push('app-icon-size-normal');
    } else if(props.size === IconSizes.SMALL) {
        classNames.push('app-icon-size-small');
    } else if(props.size === IconSizes.BIG) {
        classNames.push('app-icon-size-big');
    }

    return classNames.join(' ');
}