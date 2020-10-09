import { FieldMessage, FieldMessagePath, Message } from "packages/common/entity-base/common-types";
import { FieldMessagePathPart, FormElementState, IsFormElementTypeConfirmationProp } from "./types";

type PathFormElement = {
    path: FieldMessagePath
    formElement: FormElementState
}

type ExtractionSettings = {
    state: any
    fieldMessagesPrefixPath: FieldMessagePath
}

export function getPathFormElementsToConsiderForMessages(settings: ExtractionSettings): PathFormElement[] {
    if (typeof settings.state !== 'object') {
        return [];
    }
    let elements: PathFormElement[] = [];
    let subPath = settings.fieldMessagesPrefixPath;
    const isStateAFormElementToConsiderForMessages = (
        settings.state[IsFormElementTypeConfirmationProp]
        && settings.state.fieldMessagePathPart !== undefined
    );
    if (isStateAFormElementToConsiderForMessages) {
        const { fieldMessagePathPart } = settings.state;
        const fieldMessagePathPartToAdd: FieldMessagePathPart = (Array.isArray(fieldMessagePathPart)
            ? fieldMessagePathPart
            : [fieldMessagePathPart]
        );
        subPath = [...subPath, ...fieldMessagePathPartToAdd];
        elements.push({ path: subPath, formElement: settings.state });
    }
    let subSubPath = subPath;
    for (const index in settings.state) {
        const subState = settings.state[index];
        if (Array.isArray(settings.state)) {
            subSubPath = [...subPath, index];
        }
        elements = [
            ...elements,
            ...getPathFormElementsToConsiderForMessages({
                state: subState,
                fieldMessagesPrefixPath: subSubPath,
            }),
        ];
    }
    return elements;
}

export function getMessagesByPathFromFieldMessages(path: FieldMessagePath, fieldMessages: FieldMessage[]): Message[] {
    const comparisonPathString = path.join(',');
    const relevantFieldMessages = fieldMessages.filter((fm) => fm.path.join(',') === comparisonPathString);
    return relevantFieldMessages.map((fm) => fm.message);
}
