import axios from 'axios';
import config from '../config/config';
import {
    SET_USER,
    LOADING_USER_DETAILS_ON,
    LOADING_USER_DETAILS_OFF
} from '../constants/actionTypes';

export const signIn = (username, password) => {
    return axios.post(`${config.url}/login`, {
        email: username,
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
        type: SET_USER,
        payload: {
            user: user,
            isUserLoggedIn: true
        }
    })
};

export const getLoggedUser = () => dispatch => {
    dispatch({ type: LOADING_USER_DETAILS_ON });
    axios.get(`${config.url}/user`)
        .then(res => {
            dispatch({
                type: SET_USER,
                payload: {
                    user: res.data,
                    isUserLoggedIn: true
                }
            })
        })
        .finally(() => {
            dispatch({ type: LOADING_USER_DETAILS_OFF });
        })
};

