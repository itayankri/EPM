import axios from 'axios';
import config from '../config/config';

export const signIn = (username, password) => {
    return axios.post(`${config.url}/login`, {
        credentials: {
            username: username,
            password: password
        }
    });
};

export const signUp = (user) => {
    return axios.post(`${config.url}/register`, {
        user: user
    });
};