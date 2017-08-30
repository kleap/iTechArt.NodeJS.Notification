import * as types from './../actions/constants';
import * as actions from './../actions';

export const notificationReducer = (state = {}, action) => {
    switch (action.type) {
        case types.NOTIFICATION_GET_REQUEST_SUCCESS:
            const {_id, interval, message, theme} = action.data;
            return {
                ...state,
                id: _id,
                interval,
                message,
                theme
            };
        case types.NOTIFICATION_DELETE_REQUEST_SUCCESS:
            return {};
        default:
            return state;
    }
}