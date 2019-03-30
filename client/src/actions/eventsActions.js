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

export const approveParticipation = (eventId, userId, roleId) => {
    return axios.put(`${config.url}/event/${eventId}/acceptParticipation`, {
        eventId: eventId,
        userId: userId,
        roleId: roleId,
    })
};

export const declineParticipation = (eventId, userId, roleId) => {
    return axios.put(`${config.url}/event/${eventId}/declineParticipation`, {
        eventId: eventId,
        userId: userId,
        roleId: roleId,
    })
};