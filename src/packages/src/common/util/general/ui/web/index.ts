export { useOnClickOutside, useKeyPress } from './custom.effects';

// todo: use in UI layer for dropdown:
export function setSelectedOptionsScrollPosition(
    containerElement: HTMLDivElement | null,
    focusedElement: HTMLDivElement | null
): void {
    if (!containerElement || !focusedElement) {
        return;
    }
    const isFocusedElementAboveContainerTop = focusedElement.offsetTop < containerElement.scrollTop;
    if (isFocusedElementAboveContainerTop) {
        focusedElement.scrollIntoView({ block: 'start' });
        return;
    }
    const containerBottom = containerElement.scrollTop + containerElement.clientHeight;
    const focusedElementBottom = focusedElement.offsetTop + focusedElement.clientHeight;
    const isFocusedElementBelowContainerBottom = focusedElementBottom < containerBottom;
    if (isFocusedElementBelowContainerBottom) {
        focusedElement.scrollIntoView({ block: 'start' });
        return;
    }
}
