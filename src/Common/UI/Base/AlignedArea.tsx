import React, {FC} from 'react';
import styled from "styled-components";
import {StyledComponentProps} from "Common/UI/Design/Types";

const StyledAlignedAreaDiv = styled.div`
    display: table;
    height:100%;
    width: 100%;
`;

type StyledAlignedAreaContentProps = (StyledComponentProps & {
    verticalAlign?: string,
    horizontalAlign?: string,
});

const StyledAlignedAreaContent = styled.div<StyledAlignedAreaContentProps>`
    display: table-cell;
    horizontal-align: ${(props) => (props.horizontalAlign || horizontalAligns.LEFT)}
    vertical-align: ${(props) => (props.verticalAlign || verticalAligns.TOP)}
`;

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

export const AlignedArea: FC<VerticalAlignAreaProps> = (props) => {
    return (
        <StyledAlignedAreaDiv>
            <StyledAlignedAreaContent horizontalAlign={props.horizontalAlign} verticalAlign={props.verticalAlign}>
                {props.children}
            </StyledAlignedAreaContent>
        </StyledAlignedAreaDiv>
    );
};