import { handleActions } from 'redux-actions';
import { actions } from './../actions';

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

const reducer = handleActions({
  [actions.closeNotification](state, action) {
    const notifications = state.notifications.filter(n => n.id !== action.payload);
    return {
      ...state,
      notifications,
    };
  },
  [actions.showNotification](state, action) {
    return {
      ...state,
      notifications: [...state.notifications, action.payload],
    };
  },
}, {
  notifications: items,
});

export default reducer;
