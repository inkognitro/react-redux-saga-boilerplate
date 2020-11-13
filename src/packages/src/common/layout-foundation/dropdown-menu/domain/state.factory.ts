import { DropdownOptionState, OptionData } from './types';
import { createOptionState } from 'packages/common/layout-foundation/options/domain';

export type DropdownOptionStateCreationData<DpOptionData = any> = {
    data: DpOptionData | undefined;
    children?: DropdownOptionStateCreationData<DpOptionData>[];
};

function createDropdownOptionStateFromData<DpOptionData = any>(
    settings: DropdownOptionStateCreationData<DpOptionData>
): DropdownOptionState<DpOptionData> {
    return createOptionState<OptionData<DpOptionData>>({
        data: {
            data: settings.data,
            children: !settings.children
                ? []
                : settings.children.map((childSettings) => createDropdownOptionStateFromData(childSettings)),
        },
    });
}

export function createDropdownOptionsState<DpOptionData = any>(
    settings: DropdownOptionStateCreationData<DpOptionData>[]
): DropdownOptionState<DpOptionData>[] {
    return settings.map((setting) => createDropdownOptionStateFromData(setting));
}
