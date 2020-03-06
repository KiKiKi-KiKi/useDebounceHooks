import { useState, useCallback, useRef } from 'react';

const DefaultDelayTime = 300;

export default function useDebounceCallback(callback, delay = DefaultDelayTime, initiValue = null) {
  const [val, setVal] = useState(initiValue);
  const debounceTimer = useRef(null);

  const dispatch = useCallback(
    (...args) => {
      clearTimeout(debounceTimer.current);
      debounceTimer.current = setTimeout(() => {
        setVal(callback(...args));
      }, delay);
    },
    [callback, delay, debounceTimer]
  );

  return [val, dispatch];
}
