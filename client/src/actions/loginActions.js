import axios from 'axios';
import config from '../config/config';
import {
    SIGN_IN,
} from '../constants/actionTypes';

export const signIn = (username, password) => {
    return axios.post(`${config.url}/login`, {
        username: username,
        password: password
    })
};

export const signUp = (user) => dispatch => {
    return axios.post(`${config.url}/user`, {
        ...user
    })
};

export const setUser = (user) => dispatch => {
    dispatch({
        type: SIGN_IN,
        payload: {
            user: user,
            isUserLoggedIn: true
        }
    })
};