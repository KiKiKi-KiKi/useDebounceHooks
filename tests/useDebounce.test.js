import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import useDebounce from '../src/useDebounce';

jest.useFakeTimers();

function Component({ text }) {
  const [value, setValue] = useDebounce(text, 1000);
  return (
    <div onClick={() => setValue(`${value} World!`)}>
      {value}
    </div>
  );
}

describe('useDebounce Hook', () => {
  test('set initial value in first render', () => {
    const component = mount(<Component text="Hello" />);
    expect(component.text()).toBe('Hello');
  });

  test('update value when after debounce timer end', () => {
    const component = mount(<Component text="Hello" />);
    expect(component.text()).toBe('Hello');

    // onclick to update
    act(() => {
      component.simulate('click');
    });
    expect(component.text()).toBe('Hello');

    act(() => {
      jest.runAllTimers();
    });
    // after Debounce Timer ended, update text
    expect(component.text()).toBe('Hello World!');
  });
});
