import { useEffect } from 'react';

export function useClickOutside(ref: any, handler: any) {
  useEffect(() => {
    const listener = (event: any) => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener('mouseup', listener);
    document.addEventListener('touchend', listener);
    return () => {
      document.removeEventListener('mouseup', listener);
      document.removeEventListener('touchend', listener);
    };
  }, [ref, handler]);
}
