import React from 'react';
import { shallow } from 'enzyme';

import Notification from './Notification';


describe('<Notification/>', () => {
  it('should proper render all message and header', () => {
    const wrapper = shallow(<Notification
      header="asd"
      type="error"
      message="error"
      id="qq1"
      close={() => { }}
    />);

    expect(wrapper.contains([<h3>asd</h3>, <span>error</span>]));
  });

  it('should proper call close callback on click', () => {
    const mockCallback = jest.fn();
    const wrapper = shallow(<Notification id="qq1" close={mockCallback} />);

    wrapper.find('button').simulate('click');
    expect(mockCallback.mock.calls.length).toBe(1);

    wrapper.find('button').simulate('click');
    expect(mockCallback.mock.calls.length).toBe(2);
  });

  it('should pass proper value to callback on click', () => {
    const mockCallback = jest.fn();
    const wrapper = shallow(<Notification id="qq1" close={mockCallback} />);

    wrapper.find('button').simulate('click');
    expect(mockCallback).toBeCalledWith('qq1');
  });
});
