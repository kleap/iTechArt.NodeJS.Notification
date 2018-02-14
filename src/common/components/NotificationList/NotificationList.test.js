import React from 'react';
import { shallow, mount } from 'enzyme';

import NotificationList from './NotificationList';
import Notification from './../Notification';

const items = [{
  id: '1',
  header: 'Like Mike',
  message: 'sit amet consectetuer adipiscing elit proin risus praesent lectus vestibulum quam sapien varius ut blandit',
  type: 'error',
}, {
  id: '2',
  header: "By Dawn's Early Light",
  message: 'aliquam erat volutpat in congue etiam justo etiam pretium iaculis justo in hac habitasse platea dictumst etiam',
  type: 'error',
}, {
  id: '3',
  header: 'Codes of Gender, The',
  message: 'dictumst morbi vestibulum velit id pretium iaculis diam erat fermentum justo nec condimentum neque sapien placerat ante nulla justo',
  type: null,
}];


describe('<Notification/>', () => {
  it('should render three <Notifications/>', () => {
    const wrapper = shallow(<NotificationList notifications={items.slice()} />);
    expect(wrapper.find(Notification)).toHaveLength(3);
  });

  it('should render three <Notifications/>', () => {
    const wrapper = mount(<NotificationList notifications={items.slice()} />);
    expect(wrapper.find('.notification')).toHaveLength(3);
  });

  it('should render call onNotificationClose callback', () => {
    const mockCallback = jest.fn();
    const wrapper = mount(<NotificationList onNotificationClose={mockCallback} notifications={items.slice()} />);

    wrapper.find('.notification').first().find('button').simulate('click');
    expect(mockCallback.mock.calls.length).toBe(1);
    expect(mockCallback).toBeCalledWith('1');
  });

  it('should call onNotificationClose callback', () => {
    const mockCallback = jest.fn();
    const wrapper = mount(<NotificationList onNotificationClose={mockCallback} notifications={items.slice()} />);

    wrapper.find('.notification').forEach(n => n.find('button').simulate('click'));
    expect(mockCallback.mock.calls.length).toBe(3);
  });

  it('should call onNotificationClose callback after timers', async () => {
    const mockCallback = jest.fn();
    jest.useFakeTimers();
    const wrapper = mount(<NotificationList onNotificationClose={mockCallback} notifications={items.slice()} />);
    expect(mockCallback).not.toBeCalled();

    jest.runAllTimers();
    expect(mockCallback).toBeCalled();
    expect(mockCallback).toHaveBeenCalledTimes(3);
  });
});
