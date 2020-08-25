import { FormElementState } from "packages/common/FormElement/Domain";

export type FormState<SpecificElementsByName = {}> = {
    id: string
    isRequestRunning: boolean
    elementsByName: FormElementsByName<SpecificElementsByName>
};

export type FormElementsByName<SpecificElementsByName> = ({ [name: string]: FormElementState} & SpecificElementsByName)
