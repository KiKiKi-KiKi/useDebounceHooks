import { useState, useCallback, useRef } from 'react';

const DefaultDelayTime = 300;

export default function useDebounceCallback<T extends (...args: any[]) => any>(
  callback: T,
  delay: number = DefaultDelayTime,
  initiValue?: any
): [ReturnType<T> | undefined, (...args: any[]) => void, () => void] {
  const [val, setVal] = useState<ReturnType<T> | undefined>(initiValue);
  const debounceTimer = useRef<ReturnType<typeof window.setTimeout> | null>(null);

  const dispatch = useCallback(
    (...args) => {
      debounceTimer.current && clearTimeout(debounceTimer.current);
      debounceTimer.current = setTimeout(() => {
        setVal(callback(...args));
      }, delay);
    },
    [callback, delay, debounceTimer]
  );

  const cancel = useCallback(() => {
    debounceTimer.current && clearTimeout(debounceTimer.current);
  }, [debounceTimer]);

  return [val, dispatch, cancel];
}
