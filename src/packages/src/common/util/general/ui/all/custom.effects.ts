import { useRef, useEffect, DependencyList } from 'react';

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
