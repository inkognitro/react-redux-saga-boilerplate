import { OptionState } from 'packages/common/layout-foundation/options/domain';

export type OptionData<DpOptionData> = {
    data: DpOptionData | undefined;
    children: DropdownOptionState<DpOptionData>[];
};

export type DropdownOptionState<DpOptionData = any> = OptionState<OptionData<DpOptionData>>;
