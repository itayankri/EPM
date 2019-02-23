'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Participations', [{
    // USER 1
      "userId":1,
      "eventId":1,
      "roleId":1,
      "statusId":1,
      "updatedAt": "2019-01-12T09:37:46.207Z",
      "createdAt": "2019-01-12T09:37:46.207Z"
    }, {
      "userId":1,
      "eventId":2,
      "roleId":2,
      "statusId":2,
      "updatedAt": "2019-01-12T09:37:46.207Z",
      "createdAt": "2019-01-12T09:37:46.207Z"
    }, {
      "userId":1,
      "eventId":3,
      "roleId":3,
      "statusId":3,
      "updatedAt": "2019-01-12T09:37:46.207Z",
      "createdAt": "2019-01-12T09:37:46.207Z"
    }, {
      "userId":1,
      "eventId":4,
      "roleId":1,
      "statusId":2,
      "updatedAt": "2019-01-12T09:37:46.207Z",
      "createdAt": "2019-01-12T09:37:46.207Z"
    }, {
      "userId":1,
      "eventId":5,
      "roleId":2,
      "statusId":3,
      "updatedAt": "2019-01-12T09:37:46.207Z",
      "createdAt": "2019-01-12T09:37:46.207Z"
    }, {
      "userId":1,
      "eventId":6,
      "roleId":3,
      "statusId":1,
      "updatedAt": "2019-01-12T09:37:46.207Z",
      "createdAt": "2019-01-12T09:37:46.207Z"
    }, {
    // USER 2
      "userId":2,
      "eventId":1,
      "roleId":1,
      "statusId":1,
      "updatedAt": "2019-01-12T09:37:46.207Z",
      "createdAt": "2019-01-12T09:37:46.207Z"
    }, {
      "userId":2,
      "eventId":1,
      "roleId":1,
      "statusId":1,
      "updatedAt": "2019-01-12T09:37:46.207Z",
      "createdAt": "2019-01-12T09:37:46.207Z"
    }, {
      "userId":2,
      "eventId":1,
      "roleId":1,
      "statusId":1,
      "updatedAt": "2019-01-12T09:37:46.207Z",
      "createdAt": "2019-01-12T09:37:46.207Z"
    }, {
    // USER 3
      "userId":3,
      "eventId":3,
      "roleId":1,
      "statusId":1,
      "updatedAt": "2019-01-12T09:37:46.207Z",
      "createdAt": "2019-01-12T09:37:46.207Z"
    }, {
      "userId":3,
      "eventId":6,
      "roleId":2,
      "statusId":2,
      "updatedAt": "2019-01-12T09:37:46.207Z",
      "createdAt": "2019-01-12T09:37:46.207Z"
    }, {
    // USER 4
      "userId":4,
      "eventId":4,
      "roleId":2,
      "statusId":2,
      "updatedAt": "2019-01-12T09:37:46.207Z",
      "createdAt": "2019-01-12T09:37:46.207Z"
    }, {
    // USER 5
      "userId":5,
      "eventId":5,
      "roleId":2,
      "statusId":2,
      "updatedAt": "2019-01-12T09:37:46.207Z",
      "createdAt": "2019-01-12T09:37:46.207Z"
    }, {
    // USER 6
      "userId":6,
      "eventId":6,
      "roleId":2,
      "statusId":2,
      "updatedAt": "2019-01-12T09:37:46.207Z",
      "createdAt": "2019-01-12T09:37:46.207Z"
    }], {});
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
