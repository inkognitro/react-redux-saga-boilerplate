import { v4 as uuidV4 } from 'uuid';
import { OptionState } from './types';

export type OptionStateCreationSettings<OptionData = any> = Partial<OptionState> & { data: OptionData };

export function createOptionState<OptionData = any>(
    settings: OptionStateCreationSettings<OptionData>
): OptionState<OptionData> {
    return {
        key: uuidV4(),
        isSelected: false,
        isFocused: false,
        ...settings,
    };
}

export function createOptionsState<OptionData = any>(
    settings: OptionStateCreationSettings<OptionData>[] = []
): OptionState<OptionData>[] {
    return settings.map((setting) => createOptionState(setting));
}
