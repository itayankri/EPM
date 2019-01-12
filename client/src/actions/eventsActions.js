import axios from 'axios';
import config from '../config/config';

export const submitEvent = event => {
    return axios.post(`${config.url}/event`, event).then(res => {
        console.log(res);
    }).catch(err => {
        console.log(err);
    });
};