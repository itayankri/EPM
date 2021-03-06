const Blog = require('../models').BlogMessage;
const User = require('../models').User;
const Sequelize = require('sequelize');

const getEventMessages = (req, res) => {
    Blog.findAll({
        where: {
            eventId: req.params.eventId
        },
        order: [['id', 'DESC'], ['createdAt', 'DESC']],
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'middleName', 'lastName', 'country']
            }
        ]
    })
        .then(messages => {
            res.send(messages)
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('Server Error - ' + err);
        })
};

const postEventMessage = (req, res) => {
    Blog.create({
        eventId: req.params.eventId,
        //TODO: Use userId from session after session is fixed.
        //userId: req.session.user.id,
        userId: 2,
        content: req.body.message,
        likes: 0
    })
        .then(message => {
            res.send(message)
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('Server Error - ' + err);
        })
};

const removeEventMessage = (req, res) => {
    Blog.destroy({
        where: {
            id: req.params.messageId
        }
    })
        .then(() => {
            res.send('Message Removed');
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('Server Error - ' + err);
        })
};

const updateEventMessage = (req, res) => {
    Blog.update({
        content: req.body.message,
    }, {
        where: {
            id: req.params.messageId
        }
    })
        .then(() => {
            res.send("Message Updated");
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('Server Error - ' + err);
        })
};

module.exports = {
    getEventMessages,
    postEventMessage,
    removeEventMessage,
    updateEventMessage
};