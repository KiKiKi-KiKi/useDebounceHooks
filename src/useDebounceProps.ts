import { useState, useEffect, useCallback, useRef } from 'react';

const DefaultDelayTime = 300;

export default function useDebouncePeops<T>(
  value: T | undefined,
  delay: number = DefaultDelayTime
): [T | undefined, () => void] {
  const [val, setVal] = useState<T | undefined>(value);
  const prevValueRef: { current: T | undefined } = useRef(val);
  const debounceTimer = useRef<ReturnType<typeof window.setTimeout> | null>(null);

  const dispatch = useCallback(
    (value?: T) => {
      debounceTimer.current && clearTimeout(debounceTimer.current);
      debounceTimer.current = setTimeout(() => {
        setVal((prevVal: T | undefined) => {
          prevValueRef.current = prevVal;
          return value;
        });
      }, delay);
    },
    [delay, debounceTimer]
  );

  const cancel = useCallback(() => {
    debounceTimer.current && clearTimeout(debounceTimer.current);
  }, [debounceTimer]);

  useEffect(() => {
    if (value !== prevValueRef.current) {
      dispatch(value);
      prevValueRef.current = value;
    }
  }, [value, dispatch]);

  return [val, cancel];
}
