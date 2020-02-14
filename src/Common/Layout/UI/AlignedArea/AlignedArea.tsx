import React, {FunctionComponent} from 'react';
import './AlignedArea.scss';

export enum verticalAligns {
    TOP = 'top',
    MIDDLE = 'middle',
    BOTTOM = 'bottom',
}

export enum horizontalAligns {
    LEFT = 'left',
    CENTER = 'center',
    RIGHT = 'right',
}

export type VerticalAlignAreaProps = {
    horizontalAlign?: horizontalAligns,
    verticalAlign?: verticalAligns,
};

function createContentClassName(props: VerticalAlignAreaProps) {
    let classNames = ['app-vertical-align-area-content'];
    if (props.verticalAlign === verticalAligns.TOP) {
        classNames.push('vertical-aligned-top');
    }
    if (props.verticalAlign === verticalAligns.MIDDLE) {
        classNames.push('vertical-aligned-middle');
    }
    if (props.verticalAlign === verticalAligns.BOTTOM) {
        classNames.push('vertical-aligned-bottom');
    }
    if (props.horizontalAlign === horizontalAligns.LEFT) {
        classNames.push('horizontal-aligned-left');
    }
    if (props.horizontalAlign === horizontalAligns.CENTER) {
        classNames.push('horizontal-aligned-center');
    }
    if (props.horizontalAlign === horizontalAligns.RIGHT) {
        classNames.push('horizontal-aligned-right');
    }
    return classNames.join(' ');
}

export const AlignedArea: FunctionComponent<VerticalAlignAreaProps> = (props) => {
    return (
        <div className="app-aligned-area">
            <div className={createContentClassName(props)}>
                {props.children}
            </div>
        </div>
    );
};