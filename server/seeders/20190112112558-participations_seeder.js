'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Participations', [{
      // USER 1
      "userId": 1,
      "eventId": 1,
      "roleId": 1,
      "status": "PENDING",
      "updatedAt": "2019-01-12T09:37:46.207Z",
      "createdAt": "2019-01-12T09:37:46.207Z"
    }, {
      "userId": 1,
      "eventId": 2,
      "roleId": 2,
      "status": "APPROVED",
      "updatedAt": "2019-01-12T09:37:46.207Z",
      "createdAt": "2019-01-12T09:37:46.207Z"
    }, {
      "userId": 1,
      "eventId": 3,
      "roleId": 3,
      "status": "DECLINED",
      "updatedAt": "2019-01-12T09:37:46.207Z",
      "createdAt": "2019-01-12T09:37:46.207Z"
    }, {
      "userId": 1,
      "eventId": 4,
      "roleId": 1,
      "status": "UNCLAIMED",
      "updatedAt": "2019-01-12T09:37:46.207Z",
      "createdAt": "2019-01-12T09:37:46.207Z"
    }, {
      "userId": 1,
      "eventId": 5,
      "roleId": 2,
      "status": "PENDING",
      "updatedAt": "2019-01-12T09:37:46.207Z",
      "createdAt": "2019-01-12T09:37:46.207Z"
    }, {
      "userId": 1,
      "eventId": 6,
      "roleId": 3,
      "status": "APPROVED",
      "updatedAt": "2019-01-12T09:37:46.207Z",
      "createdAt": "2019-01-12T09:37:46.207Z"
    }, {
      // USER 2
      "userId": 2,
      "eventId": 1,
      "roleId": 1,
      "status": "APPROVED",
      "updatedAt": "2019-01-12T09:37:46.207Z",
      "createdAt": "2019-01-12T09:37:46.207Z"
    }, {
      // USER 2
      "userId": 2,
      "eventId": 2,
      "roleId": 2,
      "status": "APPROVED",
      "updatedAt": "2019-01-12T09:37:46.207Z",
      "createdAt": "2019-01-12T09:37:46.207Z"
    }, {
      // USER 3
      "userId": 3,
      "eventId": 3,
      "roleId": 1,
      "status": "APPROVED",
      "updatedAt": "2019-01-12T09:37:46.207Z",
      "createdAt": "2019-01-12T09:37:46.207Z"
    }, {
      "userId": 3,
      "eventId": 6,
      "roleId": 2,
      "status": "UNCLAIMED",
      "updatedAt": "2019-01-12T09:37:46.207Z",
      "createdAt": "2019-01-12T09:37:46.207Z"
    }, {
      // USER 4
      "userId": 4,
      "eventId": 4,
      "roleId": 2,
      "status": "UNCLAIMED",
      "updatedAt": "2019-01-12T09:37:46.207Z",
      "createdAt": "2019-01-12T09:37:46.207Z"
    }, {
      // USER 5
      "userId": 5,
      "eventId": 5,
      "roleId": 2,
      "status": "UNCLAIMED",
      "updatedAt": "2019-01-12T09:37:46.207Z",
      "createdAt": "2019-01-12T09:37:46.207Z"
    }, {
      // USER 6
      "userId": 6,
      "eventId": 6,
      "roleId": 2,
      "status": "UNCLAIMED",
      "updatedAt": "2019-01-12T09:37:46.207Z",
      "createdAt": "2019-01-12T09:37:46.207Z"
    }, {
      // USER 7
      "userId": 7,
      "eventId": 2,
      "roleId": 1,
      "status": "APPROVED",
      "updatedAt": "2019-01-12T09:37:46.207Z",
      "createdAt": "2019-01-12T09:37:46.207Z"
    }, {
      // USER 8
      "userId": 8,
      "eventId": 2,
      "roleId": 1,
      "status": "APPROVED",
      "updatedAt": "2019-01-12T09:37:46.207Z",
      "createdAt": "2019-01-12T09:37:46.207Z"
    }, {
      // USER 9
      "userId": 9,
      "eventId": 2,
      "roleId": 1,
      "status": "APPROVED",
      "updatedAt": "2019-01-12T09:37:46.207Z",
      "createdAt": "2019-01-12T09:37:46.207Z"
    }, {
      // USER 10
      "userId": 10,
      "eventId": 2,
      "roleId": 1,
      "status": "APPROVED",
      "updatedAt": "2019-01-12T09:37:46.207Z",
      "createdAt": "2019-01-12T09:37:46.207Z"
    }, {
      // USER 11
      "userId": 11,
      "eventId": 2,
      "roleId": 2,
      "status": "APPROVED",
      "updatedAt": "2019-01-12T09:37:46.207Z",
      "createdAt": "2019-01-12T09:37:46.207Z"
    }, {
      // USER 12
      "userId": 12,
      "eventId": 2,
      "roleId": 1,
      "status": "APPROVED",
      "updatedAt": "2019-01-12T09:37:46.207Z",
      "createdAt": "2019-01-12T09:37:46.207Z"
    }, {
      // USER 13
      "userId": 13,
      "eventId": 2,
      "roleId": 1,
      "status": "APPROVED",
      "updatedAt": "2019-01-12T09:37:46.207Z",
      "createdAt": "2019-01-12T09:37:46.207Z"
    }, {
      // USER 14
      "userId": 14,
      "eventId": 2,
      "roleId": 2,
      "status": "APPROVED",
      "updatedAt": "2019-01-12T09:37:46.207Z",
      "createdAt": "2019-01-12T09:37:46.207Z"
    }, {
      // USER 15
      "userId": 15,
      "eventId": 2,
      "roleId": 1,
      "status": "APPROVED",
      "updatedAt": "2019-01-12T09:37:46.207Z",
      "createdAt": "2019-01-12T09:37:46.207Z"
    }, {
      // USER 16
      "userId": 16,
      "eventId": 2,
      "roleId": 1,
      "status": "APPROVED",
      "updatedAt": "2019-01-12T09:37:46.207Z",
      "createdAt": "2019-01-12T09:37:46.207Z"
    }, {
      // USER 17
      "userId": 17,
      "eventId": 2,
      "roleId": 2,
      "status": "APPROVED",
      "updatedAt": "2019-01-12T09:37:46.207Z",
      "createdAt": "2019-01-12T09:37:46.207Z"
    }, {
      // USER 18
      "userId": 18,
      "eventId": 2,
      "roleId": 1,
      "status": "APPROVED",
      "updatedAt": "2019-01-12T09:37:46.207Z",
      "createdAt": "2019-01-12T09:37:46.207Z"
    }, {
      // USER 19
      "userId": 19,
      "eventId": 2,
      "roleId": 1,
      "status": "APPROVED",
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
