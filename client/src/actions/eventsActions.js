import axios from 'axios';
import config from '../config/config';

export const submitEvent = event => {
    return axios.post(`${config.url}/event`, event).then(res => {
        console.log(res);
        return true;
    }).catch(err => {
        console.log('submitEvent Error', err);
        return false;
    });
};

export const getEvents = () => {
    return axios.get(`${config.url}/events`).then(res => {
        console.log(res);
        return res;
    }).catch(err => {
        console.log('getEvents Error', err);
        return err;
    });
};