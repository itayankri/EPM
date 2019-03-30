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

export const downloadForm = () => {
    axios({
        url: `${config.url}/static/pdfs/healthForm.pdf`,
        method: 'GET',
        responseType: 'blob', // important
    }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'healthForm.pdf');
        document.body.appendChild(link);
        link.click();
    });
};