const EventRole = require('../models').EventRole;
const Sequelize = require('sequelize');

const getEventRoles = (req, res) => {
    EventRole.findAll()
        .then(eventRoles => {
            res.send(eventRoles);
        })
        .catch(err => {
            console.log(err);
            res.status(400).send(err);
        })
};

module.exports = {
    getEventRoles
};