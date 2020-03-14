import { useState, useCallback, useRef } from 'react';

const DefaultDelayTime = 300;

export default function useDebounce<T>(
  initValue: T | undefined,
  delay: number = DefaultDelayTime
): [T | undefined, (arg?: T) => void] {
  const [val, setVal] = useState(initValue);
  const debounceTimer = useRef<ReturnType<typeof window.setTimeout> | null>(null);

  const dispatch = useCallback(
    (value?: T) => {
      debounceTimer.current && clearTimeout(debounceTimer.current);
      debounceTimer.current = setTimeout(() => {
        setVal(value);
      }, delay);
    },
    [delay, debounceTimer]
  );

  return [val, dispatch];
}
