import { useEffect, DependencyList, RefObject, useState } from 'react';
import { v4 as uuidV4 } from 'uuid';

export function useOnClickOutside(ref: RefObject<any>, fn: (event: MouseEvent) => void) {
    useEffect(() => {
        const listener = (event: MouseEvent) => {
            if (!ref.current || ref.current.contains(event.target)) {
                return;
            }
            fn(event);
        };
        document.addEventListener('mousedown', listener);
        document.addEventListener('touchstart', listener);
        return () => {
            document.removeEventListener('mousedown', listener);
            document.removeEventListener('touchstart', listener);
        };
    }, [ref, fn]);
}

export function useKeyPress(
    fn: (keyboardKey: string, event: KeyboardEvent | undefined) => void,
    deps: DependencyList = []
): void {
    const [currentKeyPressId, setCurrentKeyPressId] = useState<string | null>(null);
    function triggerCallbackFromKeyPress(keyboardKey: string, keyPressId: string) {
        setTimeout(() => {
            if (keyPressId !== currentKeyPressId) {
                return;
            }
            fn(keyboardKey, undefined);
            triggerCallbackFromKeyPress(keyboardKey, keyPressId);
        }, 200);
    }
    function downHandler(event: KeyboardEvent) {
        const keyPressId = uuidV4();
        setCurrentKeyPressId(keyPressId);
        fn(event.key, event);
        setTimeout(() => triggerCallbackFromKeyPress(event.key, keyPressId), 1000);
    }
    const upHandler = () => {
        setCurrentKeyPressId(null);
    };
    useEffect(() => {
        window.addEventListener('keydown', downHandler);
        window.addEventListener('keyup', upHandler);
        // Remove event listeners on cleanup
        return () => {
            window.removeEventListener('keydown', downHandler);
            window.removeEventListener('keyup', upHandler);
        };
    }, [...deps, fn]);
}
