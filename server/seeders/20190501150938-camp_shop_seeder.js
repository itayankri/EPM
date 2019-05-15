'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('CampShops', [{
      // ITEM 1
      "eventId": "1",
      "name": "item1",
      "quantity": "0",
      "updatedAt": "2019-01-12T10:59:38.363Z",
      "createdAt": "2019-01-12T10:59:38.363Z",}, {
        // ITEM 1
      "eventId": "1",
      "name": "item1",
      "quantity": "1",
      "updatedAt": "2019-01-12T10:59:38.363Z",
      "createdAt": "2019-01-12T10:59:38.363Z",}, {
        // ITEM 2
      "eventId": "1",
      "name": "item2",
      "quantity": "2",
      "updatedAt": "2019-01-12T10:59:38.363Z",
      "createdAt": "2019-01-12T10:59:38.363Z",}, {
        // ITEM 3
      "eventId": "1",
      "name": "item3",
      "quantity": "3",
      "updatedAt": "2019-01-12T10:59:38.363Z",
      "createdAt": "2019-01-12T10:59:38.363Z",}, {
        // ITEM 4
      "eventId": "1",
      "name": "item4",
      "quantity": "4",
      "updatedAt": "2019-01-12T10:59:38.363Z",
      "createdAt": "2019-01-12T10:59:38.363Z",}, {
        // ITEM 5
      "eventId": "1",
      "name": "item5",
      "quantity": "5",
      "updatedAt": "2019-01-12T10:59:38.363Z",
      "createdAt": "2019-01-12T10:59:38.363Z",}
    ], {});
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
