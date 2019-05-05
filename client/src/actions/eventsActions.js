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

export const getContactList = (eventId) => {
    return axios.get(`${config.url}/event/${eventId}/contactList`);
};

export const getCountryFlag = (countryName) => {
    return axios.get(`https://restcountries.eu/rest/v2/name/${countryName}`).then(res => {
        return `https://restcountries.eu/data/${res.data[0].alpha3Code.toLowerCase()}.svg`;
    });

};

export const downloadForm = (formName, eventId, userId) => {
    console.log("DownloadForm");
    if (!eventId) {
        console.log("EventId is not defined");
        return;
    }
    if (!userId) {
        console.log("UserId is not defined");
        return;
    }
    axios.post(`${config.url}/event/${eventId}/generateForm`, {
        formName: formName,
        eventId: eventId,
        userId: userId
    })
        .then(filePath => {
            console.log(filePath);
            console.log(filePath.data);
            console.log(`${config.url}/static/pdfs/filledForms/${filePath.data.split("\\")[8]}`);
            axios({
                url: `${config.url}/static/pdfs/filledForms/${filePath.data.split("\\")[8]}`,
                method: 'GET',
                responseType: 'blob', // important
            }).then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', formName);
                document.body.appendChild(link);
                link.click();
            });
        });

};

export const getParticipations = (eventId) => {
    return axios.get(`${config.url}/event/${eventId}/participantsToRandomize`)
        .then(response => {
            return response
        })
};


export const randomizeParticipants = (eventId, payload) => {
    return axios.post(`${config.url}/event/${eventId}/roomRandomizer`, payload)
        .then(response => {
            return response.data.Rooms
        });

};

export const getEventBlogMessages = (eventId) => {
    return axios.get(`${config.url}/event/${eventId}/blogMessages`)
        .then(response => {
            return response.data;
        })
};

export const postComment = (eventId, comment) => {
    return axios.post(`${config.url}/event/${eventId}/blogMessages`, {
        message: comment
    })
};

export const removeComment = (eventId, messageId) => {
    return axios.delete(`${config.url}/event/${eventId}/blogMessages/${messageId}`);
};