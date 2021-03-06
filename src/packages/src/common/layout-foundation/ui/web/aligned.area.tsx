import React, { FC } from 'react';
import styled from 'styled-components';
import { StyledComponentProps } from 'packages/common/design/ui/web';

const StyledAlignedAreaDiv = styled.div`
    display: table;
    height: 100%;
    width: 100%;
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

type StyledAlignedAreaContentProps = StyledComponentProps & {
    verticalAlign?: string;
    horizontalAlign?: string;
};

const StyledAlignedAreaContent = styled.div<StyledAlignedAreaContentProps>`
    display: table-cell;
    text-align: ${(props) => props.horizontalAlign || horizontalAligns.LEFT};
    vertical-align: ${(props) => props.verticalAlign || verticalAligns.TOP};
`;

export type AlignedAreaProps = {
    horizontalAlign?: horizontalAligns;
    verticalAlign?: verticalAligns;
};

export const AlignedArea: FC<AlignedAreaProps> = ({ horizontalAlign, verticalAlign, children }) => (
    <StyledAlignedAreaDiv>
        <StyledAlignedAreaContent horizontalAlign={horizontalAlign} verticalAlign={verticalAlign}>
            {children}
        </StyledAlignedAreaContent>
    </StyledAlignedAreaDiv>
);
