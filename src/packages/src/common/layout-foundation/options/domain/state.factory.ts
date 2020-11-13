import { v4 as uuidV4 } from 'uuid';
import { OptionState } from './types';

export function createOptionsStateFromOptionsData<OptionData = any>(
    optionsData: OptionData[]
): OptionState<OptionData>[] {
    return optionsData.map((optionData) => ({
        key: uuidV4(),
        data: optionData,
        isSelected: false,
    }));
}
