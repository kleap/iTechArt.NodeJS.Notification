import * as types from './../actions/constants';
import * as actions from './../actions';

export const dashboardReducer = (state = {}, action) => {
    switch (action.type) {

        case types.NOTIFICATION_FETCH_REQUEST_SUCCESS:
            return {
                ...state,
                items: [...action.data]
            };
        case types.NOTIFICATION_TOGGLE_REQUEST_SUCCESS:
            return {
                ...state,
                items: state
                    .items
                    .map((n) => (n._id === action.data._id
                        ? {
                            ...action.data,
                            isRunning: !n.isRunning
                        }
                        : n))
            };

        default:
            return state;
    }
}