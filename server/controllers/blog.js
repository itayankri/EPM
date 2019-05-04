const Blog = require('../models').BlogMessage;
const User = require('../models').User;
const Sequelize = require('sequelize');

const getEventMessages = (req, res) => {
    Blog.findAll({
        where: {
            eventId: req.params.eventId
        },
        include: [
            {
                model: User,
                attributes: ['firstName', 'middleName', 'lastName', 'country']
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
        userId: 2,
        content: req.body.message,
    })
        .then(message => {
            res.send(message)
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('Server Error - ' + err);
        })
};

module.exports = {
    getEventMessages,
    postEventMessage
};