const MyCampShop = require('../models').CampShop;
const Sequelize = require('sequelize');
//const TodoItem = require('../models').TodoItem;

module.exports = {
    list(req, res) {
        return MyCampShop
            .findAll({
                attributes: ["name", "quantity"],
                where: {
                    eventId: req.params.eventId
                }
            })
            .then(myItems => {
                console.log(myItems);
                res.status(200).send(myItems);
            })
            .catch(error => {
                console.log(error);
                res.status(400).send(error)
            });
    },
    addItem(req, res) {
        const { eventId } = req.params
        const quantity = parseInt(req.body.quantity || 0)
        const itemName = req.body.itemName
        if (!itemName || itemName === null || itemName === "") {
            return res.status(404).send({
                message: `Item Name is not defined`,
              });
        }
        if (!quantity || quantity === null || quantity <= 0) {
            return res.status(404).send({
                message: `We can not add nothing or a negative amount of items, now can we?`,
              });
        }
        if (quantity >= 1000) {
            return res.status(404).send({
                message: `Are you sure '${quantity}' is the right amount?`,
              });
        }
        return MyCampShop
        .findOrCreate({
            where: {
                eventId: eventId,
                name: itemName
            },
            defaults: {
                eventId: eventId,
                name: itemName,
                quantity: 0,
            }
        }).then(myItem => {
            myItem = myItem[0]
            return MyCampShop.update({
                eventId: eventId || myItem.eventId,
                name: itemName || myItem.name,
                quantity: (myItem.quantity + quantity),
            }, {
                    where: {
                        id: myItem.id
                    },
                    returning: true
                })
        })
        .then(updatedItem => {
            res.status(201).send(updatedItem[1][0])
        })
        .catch(error => { console.log(error); res.status(400).send(error) })
    },
    purchaseItem(req, res) {
        const { eventId } = req.params
        const { itemName } = req.body
        return MyCampShop
            .find({
                where: {
                    eventId: eventId,
                    name: itemName
                }
            })
            .then(myItem => {
                if (myItem.quantity == 0) {
                    throw new Error({
                        message: `There are no more ${myItem.name} left`
                    })
                }
                return MyCampShop.update({
                    eventId: eventId || myItem.eventId,
                    name: itemName || myItem.name,
                    quantity: (myItem.quantity - 1),
                }, {
                        where: {
                            id: myItem.id
                        },
                        returning: true
                    })
            })
            .then(updatedItem => { return updatedItem })
            .catch(error => { console.log(error); res.status(400).send(error) })
    },
    returnItem(req, res) {
        const { eventId } = req.params
        const { itemName } = req.body
        return MyCampShop
            .find({
                where: {
                    eventId: eventId,
                    name: itemName
                }
            })
            .then(myItem => {
                return MyCampShop.update({
                    eventId: eventId || myItem.eventId,
                    name: itemName || myItem.name,
                    quantity: (myItem.quantity + 1),
                }, {
                        where: {
                            id: myItem.id
                        },
                        returning: true
                    })
            })
            .then(updatedItem => { return updatedItem })
            .catch(error => { console.log(error); res.status(400).send(error) })
    }
};
