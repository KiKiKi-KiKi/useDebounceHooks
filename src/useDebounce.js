import { useState, useCallback, useRef } from 'react';

const DefaultDelayTime = 300;

export default function useDebounce(initValue = null, delay = DefaultDelayTime) {
  const [val, setVal] = useState(initValue);
  const debounceTimer = useRef(null);

  const dispatch = useCallback(
    (value) => {
      clearTimeout(debounceTimer.current);
      debounceTimer.current = setTimeout(() => {
        setVal(value);
      }, delay);
    },
    [delay, debounceTimer]
  );

  return [val, dispatch];
}
