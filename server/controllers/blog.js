const Blog = require('../models').BlogMessage;
const User = require('../models').User;
const Sequelize = require('sequelize');

const getEventMessages = (req, res) => {
    Blog.findAll({
        where: {
            eventId: req.params.eventId,
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['firstName', 'middleName', 'lastName', 'country']
                }
            ]
        }
    })
        .then(messages => {
            res.send(messages)
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('Server Error - ' + err);
        })
};

module.exports = {
    getEventMessages
};