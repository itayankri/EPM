'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Purchases', [
      {eventId: 1, userId: 1, itemName: 'Soda', quantity: 1, purchaseDate: new Date(), createdAt: new Date(), updatedAt: new Date()},
      {eventId: 1, userId: 1, itemName: 'Pajamas', quantity: 1, purchaseDate: new Date(), createdAt: new Date(), updatedAt: new Date()},
      {eventId: 1, userId: 1, itemName: 'T-Shirt', quantity: 1, purchaseDate: new Date(), createdAt: new Date(), updatedAt: new Date()},
      {eventId: 1, userId: 1, itemName: 'Chocolate bar', quantity: 1, purchaseDate: new Date(), createdAt: new Date(), updatedAt: new Date()},
      {eventId: 1, userId: 2, itemName: 'Soda', quantity: 1, purchaseDate: new Date(), createdAt: new Date(), updatedAt: new Date()},
      {eventId: 1, userId: 2, itemName: 'Chocolate bar', quantity: 1, purchaseDate: new Date(), createdAt: new Date(), updatedAt: new Date()},
    ])
  },
  //{eventId: 1, userId: 1, itemName: 'Soda', quantity: 1, purchaseDate: new Date(), createdAt: new Date(), updatedAt: new Date()},

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
