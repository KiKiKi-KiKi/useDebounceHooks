# useDebounceHooks

[![Build Status](https://travis-ci.org/chaika-design/useDebounceHooks.svg?branch=master)](https://travis-ci.org/chaika-design/useDebounceHooks) 
[![Coverage Status](https://coveralls.io/repos/github/chaika-design/useDebounceHooks/badge.svg?branch=master)](https://coveralls.io/github/chaika-design/useDebounceHooks?branch=master)


React custom hook

- useDebounce
- useDebounceProps
- useDebounceCallback

## install

```sh
$ npm install use-debounce-hooks
```

### useDebounce

A `useDebounce` is hook of update `state` after a waiting time.
This hook can use like a `useState`.

```js
import React from 'react';
import { useDebounce } from 'use-debounce-hooks';

const WaitTime = 300;

function Component({ initialValue }) {
  const [value, setVal, cancel] = useDebounce(initialValue, WaitTime);

  return (
    <div>
      <input onChange={(e) => setVal(e.target.value)} />
      {/* The value is updated when the timer expires after the last onChange event. */}
      <p>Debounce Value: {value}</p>
      <button onClick={() => cancel()}>CANCEL TO UPDATE</button>
    </div>
  );
}
```

### useDebounceProps

A `useDevounceProps` is hook of debounce update a `state` by `props`.
Debounce timer is start after `props` changed.

```js
import React, { useState } from 'react';
import { useDevounceProps } from 'use-debounce-hooks';

const WaitTime = 300;

function Component({ value }) {
  const [value, cancel] = useDevounceProps(value, WaitTime);

  return (
    <div>
      <p>Debounce Value: {value}</p>
      <button onClick={() => cancel()}>CANCEL TO UPDATE</button>
    </div>
  );
}

function Parent() {
  const [value, setVal] = useState(0);
  const onIncrement = () => {
    setVal((_prevValue) => {
      return _prevValue += 1;
    });
  };

  return (
    <div>
      <button onClick={onIncrement}>{value}</button>
      <Component value={value} />
    </div>
  );
}
```

### useDebounceCallback

A `useDebounceCallback` is hook of debounce update a `state` via the callback function.
After debounce timer expired call a callback and set it's return value to the `state`.

```js
import React, { useCallback } from 'react';
import useDebounceCallback from 'use-debounce-hooks';

const WaitTime = 300;
const Tax = 0.1;

function Component({ initialValue }) {
  const tax = 1 + Tax;
  const addTax = useCallback((val) => {
    return val * tax;
  }, [tax]);
  const [value, setVal, cancel] = useDebounceCallback(addTax, WaitTime, initialValue);

  return (
    <div>
      <input onChange={(e) => setVal( e.target.value - 0 )} />
      <p>Debounce Value: {value}</p>
      <button onClick={() => cancel()}>CANCEL TO UPDATE</button>
    </div>
  );
}
```
