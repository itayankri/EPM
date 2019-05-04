'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('BlogMessages', [
      {eventId: 1, userId: 1, content: 'bla', createdAt: new Date(), updatedAt: new Date()},
      {eventId: 2, userId: 1, content: 'blabla', createdAt: new Date(), updatedAt: new Date()},
      {eventId: 3, userId: 1, content: 'blablabla', createdAt: new Date(), updatedAt: new Date()},
      {eventId: 4, userId: 1, content: 'blablablabla', createdAt: new Date(), updatedAt: new Date()},
      {eventId: 5, userId: 1, content: 'blablablablabla', createdAt: new Date(), updatedAt: new Date()},
      {eventId: 6, userId: 1, content: 'blablablablablabla', createdAt: new Date(), updatedAt: new Date()},
      {eventId: 1, userId: 1, content: 'bla', createdAt: new Date(), updatedAt: new Date()},
      {eventId: 2, userId: 1, content: 'blabla', createdAt: new Date(), updatedAt: new Date()},
      {eventId: 3, userId: 1, content: 'blablabla', createdAt: new Date(), updatedAt: new Date()},
      {eventId: 4, userId: 1, content: 'blablablabla', createdAt: new Date(), updatedAt: new Date()},
      {eventId: 5, userId: 1, content: 'blablablablabla', createdAt: new Date(), updatedAt: new Date()},
      {eventId: 6, userId: 1, content: 'blablablablablabla', createdAt: new Date(), updatedAt: new Date()}
    ])
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
