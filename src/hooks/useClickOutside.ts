import {useEffect, RefObject} from 'react';


export const useClickOutside = (ref: RefObject<HTMLDivElement>, callback: () => void) => {

    const listener = (event: any) => {
        if (ref.current && !ref.current.contains(event.target)) {
            callback();
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);
        return () => {
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener);
        };
    });

}
