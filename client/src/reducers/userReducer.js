import {
    SET_USER,
    LOADING_USER_DETAILS_ON,
    LOADING_USER_DETAILS_OFF
} from '../constants/actionTypes';

export default (state = {}, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                user: action.payload.user,
                isUserLoggedIn: action.payload.isUserLoggedIn
            };

        case LOADING_USER_DETAILS_ON:
            return {
                ...state,
                loadingUserDetails: true
            };

        case LOADING_USER_DETAILS_OFF:
            return {
                ...state,
                loadingUserDetails: false
            };

        default:
            return state;
    }
};
