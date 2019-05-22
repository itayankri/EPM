const Purchase = require('../models').Purchase;
const User = require('../models').User;
const Sequelize = require('sequelize');

const getEventPurchases = (req, res) => {
    Purchase.findAll({
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
        .then(purchases => {
            res.send(purchases)
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('Server Error - ' + err);
        })
};

const purchaseItem = (req, res) => {
    Purchase.create({
        eventId: req.params.eventId,
        //TODO: Use userId from session after session is fixed.
        userId: req.session.user.id,
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

const returnItem = (req, res) => {
    Purchase.destroy({
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

module.exports = {
    getEventPurchases,
    returnItem,
    purchaseItem,
};