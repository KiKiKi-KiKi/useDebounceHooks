import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import useDebounceCallback from '../src/useDebounceCallback';

jest.useFakeTimers();

describe('useDebounceCallback Hook', () => {
  test('call callback function when ended Debounce Timer', () => {
    const callback = jest.fn();
    function Component() {
      // @ts-ignore TS6133: '_value' is declared but its value is never read.
      const [_value, setVal] = useDebounceCallback(callback, 1000);
      setVal(null);
      return null;
    }
    // @ts-ignore TS6133: 'component' is declared but its value is never read.
    const component = mount(<Component />);

    act(() => {
      jest.runAllTimers();
    });

    expect(callback).toHaveBeenCalled();
  });

  test('set initial value (3rd arugument) in first render', () => {
    const callback = jest.fn();
    function Component() {
      // @ts-ignore 'setValue' is declared but its value is never read.
      const [value, setValue] = useDebounceCallback(callback, 1000, 'Hello');
      return <div>{value}</div>;
    }

    const component = mount(<Component />);

    expect(component.text()).toBe('Hello');
  });

  test('update value through a callback, when after debounce timer end', () => {
    const callback = jest.fn((val) => val);

    function Component() {
      const [value, setVal] = useDebounceCallback(callback, 1000, 'Hello');
      return <div onClick={() => setVal('Moi!')}>{value}</div>;
    }

    const component = mount(<Component />);

    expect(component.text()).toBe('Hello');

    act(() => {
      component.simulate('click');
    });
    // don't chaneg soon
    expect(component.text()).toBe('Hello');

    // timer
    act(() => {
      jest.setTimeout(500);
    });
    // before Debounce Timer end.
    expect(component.text()).toBe('Hello');

    act(() => {
      jest.runAllTimers();
    });
    // after Debounce Timer ended, call callback & update text
    expect(callback).toHaveBeenCalled();
    expect(component.text()).toBe('Moi!');
  });

  test('update value by a callback return value, when give object to callback argument', () => {
    const callback = jest.fn(({ x, y }) => {
      return x + y;
    });
    function Component() {
      const [value, setVal] = useDebounceCallback(callback);
      return <div onClick={() => setVal({ x: 2, y: 3 })}>{value}</div>;
    }

    const component = mount(<Component />);

    act(() => {
      component.simulate('click');
      jest.runAllTimers();
    });

    expect(callback).toHaveBeenCalled();
    expect(component.text()).toBe('5');
  });
});
