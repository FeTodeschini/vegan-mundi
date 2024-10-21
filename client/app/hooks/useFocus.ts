import { useRef, useEffect } from 'react';

 export function useFocus(){
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, []);

  return ref;
 }