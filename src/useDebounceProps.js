import { useState, useEffect, useCallback, useRef } from 'react';

const DefaultDelayTime = 300;

export default function useDebouncePeops(value = null, delay = DefaultDelayTime) {
  const [val, setVal] = useState(value);
  const prevValueRef = useRef(val);
  const debounceTimer = useRef(null);

  const dispatch = useCallback(
    (value) => {
      clearTimeout(debounceTimer.current);
      debounceTimer.current = setTimeout(() => {
        setVal((prevVal) => {
          prevValueRef.current = prevVal;
          return value;
        });
      }, delay);
    },
    [delay, debounceTimer]
  );

  const cancel = useCallback(() => {
    clearTimeout(debounceTimer.current);
  }, [debounceTimer]);

  useEffect(() => {
    if (value !== prevValueRef.current) {
      dispatch(value);
      prevValueRef.current = value;
    }
  }, [value, dispatch]);

  return [val, cancel];
}
