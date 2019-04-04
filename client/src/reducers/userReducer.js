import {
    SET_USER
} from '../constants/actionTypes';

export default (state = {}, action) => {
    console.log('reducer action', action);
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                user: action.payload.user,
                isUserLoggedIn: action.payload.isUserLoggedIn
            };
        default:
            return state;
    }
};
