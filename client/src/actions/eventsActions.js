import axios from 'axios';
import config from '../config/config';

export const getEvents = () => {
    return axios.get(`${config.url}/events`);
};

export const getEvent = (eventId) => {
    return axios.get(`${config.url}/event/${eventId}`);
};

export const submitEvent = event => {
    return axios.post(`${config.url}/event`, event);
};