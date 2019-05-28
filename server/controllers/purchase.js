const Purchase = require('../models').Purchase;
const campShopController = require('../controllers/campShop');

const getEventPurchases = (req, res) => {
    return Purchase
        .findAll({
            where: {
                eventId: req.params.eventId,
            }
        })
        .then(myPurchases => res.status(200).send(myPurchases))
        .catch(error => { console.log(error); res.status(400).send(error) })
};

const purchaseItem = (req, res) => {
    const { eventId } = req.params
    const { userId, itemName } = req.body
    let body = {};
    return Purchase
        .findOrCreate({
            where: {
                eventId: eventId,
                userId: userId,
                itemName: itemName
            },
            defaults: {
                eventId: eventId,
                userId: userId,
                itemName: itemName,
                quantity: 0,
                purchaseDate: Date.now()
            }
        }).then(myPurchase => {
            myPurchase = myPurchase[0]
            return Purchase.update({
                userId: userId || myPurchase.userId,
                eventId: eventId || myPurchase.eventId,
                itemName: itemName || myPurchase.itemName,
                quantity: (myPurchase.quantity + 1),
                purchaseDate: Date.now()
            }, {
                    where: {
                        id: myPurchase.id
                    },
                    returning: true
                })
        })
        .then(updatedPurchase => {
            body.updatedPurchase = updatedPurchase[1][0];
            return campShopController.purchaseItem(req, res)
                .then(updatedItem => {
                    body.updatedItem = updatedItem[1][0];
                    res.status(201).send(body)
                })
        })
        .catch(error => { console.log(error); res.status(400).send(error) })
};

const returnItem = (req, res) => {
    const { eventId } = req.params
    const { userId, itemName } = req.body
    let body = {};
    return Purchase
        .findOrCreate({
            where: {
                eventId: eventId,
                userId: userId,
                itemName: itemName
            },
            defaults: {
                eventId: eventId,
                userId: userId,
                itemName: itemName,
                quantity: 0,
                purchaseDate: Date.now()
            }
        }).then(myPurchase => {
            myPurchase = myPurchase[0]
            return Purchase.update({
                userId: userId || myPurchase.userId,
                eventId: eventId || myPurchase.eventId,
                itemName: itemName || myPurchase.itemName,
                quantity: (myPurchase.quantity - 1),
                purchaseDate: Date.now()
            }, {
                    where: {
                        id: myPurchase.id
                    },
                    returning: true
                })
        })
        .then(updatedPurchase => {
            body.updatedPurchase = updatedPurchase[1][0];
            return campShopController.returnItem(req, res)
                .then(updatedItem => {
                    body.updatedItem = updatedItem[1][0];
                    res.status(201).send(body)
                })
        })
        .catch(error => { console.log(error); res.status(400).send(error) })
};

module.exports = {
    getEventPurchases,
    returnItem,
    purchaseItem,
};