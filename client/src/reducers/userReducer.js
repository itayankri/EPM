import {
    SIGN_IN
} from '../constants/actionTypes';

export default (state = {}, action) => {
    switch (action.type) {
        case SIGN_IN:
            return {
                ...state,
                user: action.payload.user,
                isUserLoggedIn: action.payload.isUserLoggedIn
            };
        default:
            return state;
    }
};
