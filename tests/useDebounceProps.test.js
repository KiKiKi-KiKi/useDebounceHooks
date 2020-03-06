import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import useDebouncProps from '../src/useDebounceProps';

jest.useFakeTimers();

function Component({ text }) {
  const [value] = useDebouncProps(text, 1000);
  return (
    <div>{value}</div>
  );
}

describe('useDebounceProps Hook', () => {
  test('set initial value in first render', () => {
    const component = mount(<Component text="Hello" />);
    expect(component.text()).toBe('Hello');
  });

  test('update value when after debounce timer end', () => {
    const component = mount(<Component text="Moi" />);
    expect(component.text()).toBe('Moi');

    // update props
    act(() => {
      component.setProps({ text: 'Hi, World!' });
    });
    expect(component.text()).toBe('Moi');

    // timer
    act(() => {
      jest.setTimeout(500);
    });
    // before Debounce Timer end.
    expect(component.text()).toBe('Moi');

    act(() => {
      jest.runAllTimers();
    });
    // after Debounce Timer ended, update text
    expect(component.text()).toBe('Hi, World!');
  });
});
