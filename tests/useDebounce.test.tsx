import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import useDebounce from '../src/useDebounce';

jest.useFakeTimers();

type Props = {
  text: any;
};

function Component({ text }: Props) {
  const [value, setValue] = useDebounce(text, 1000);
  return <div onClick={() => setValue(`${value} World!`)}>{value}</div>;
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

  test('cancel to debouce update', () => {
    function Component({ text }: Props) {
      const [value, setValue, cancel] = useDebounce(text, 1000);
      return (
        <div>
          <span>{value}</span>
          <button className="update" onClick={() => setValue(`${value} World!`)}>
            UPDATE
          </button>
          <button className="cancel" onClick={() => cancel()}>
            CANCEL
          </button>
        </div>
      );
    }

    const component = mount(<Component text="Hello" />);
    expect(component.find('span').text()).toBe('Hello');

    // update
    act(() => {
      component.find('.update').simulate('click');
    });
    expect(component.find('span').text()).toBe('Hello');

    // timer
    act(() => {
      jest.setTimeout(500);
    });
    // before debounce Timer end
    expect(component.find('span').text()).toBe('Hello');

    // cacncel event
    act(() => {
      component.find('.cancel').simulate('click');
      jest.runAllTimers();
    });
    expect(component.find('span').text()).toBe('Hello');
  });
});
