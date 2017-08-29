import * as types from './../actions/constants';
import * as actions from './../actions';

export const userReducer = (state = {}, action) => {
    switch (action.type) {
        case types.USER_REGISTRATION_REQUEST_SUCCESS:
            return { ...state, errors: {}};
        case types.USER_REGISTRATION_REQUEST_FAIL:
            return { ...state,  errors: action.errors };
        case types.USER_LOGIN_REQUEST_FAIL:
            return { ...state,  errors: action.errors };
        case types.USER_LOGIN_REQUEST_SUCCESS:
            return { ...state, isAuth: true, errors: {}, userId: action.userId  };
        case types.USER_LOGOUT: {
            return { ...state, isAuth: false, userId: "" };
        }
        default:
            return state;
    }
}