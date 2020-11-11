import { useRef, useEffect, DependencyList, RefObject } from 'react';

export const useDidUpdate = (fn: () => void, deps: DependencyList) => {
    const didMountRef = useRef(false);
    useEffect(() => {
        if (!didMountRef.current) {
            didMountRef.current = true;
            return;
        }
        return fn && fn();
    }, deps);
};

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
