'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('EventRoles', [
      {"id": 1, "rolename":"Participant", "updatedAt": "2019-01-12T10:59:38.363Z", "createdAt": "2019-01-12T10:59:38.363Z"},
      {"id": 2, "rolename":"Leader", "updatedAt": "2019-01-12T10:59:38.363Z", "createdAt": "2019-01-12T10:59:38.363Z"},
      {"id": 3, "rolename":"Kitchen Staff", "updatedAt": "2019-01-12T10:59:38.363Z", "createdAt": "2019-01-12T10:59:38.363Z"},
      {"id": 4, "rolename":"Director", "updatedAt": "2019-01-12T10:59:38.363Z", "createdAt": "2019-01-12T10:59:38.363Z"},
      {"id": 5, "rolename":"International Staff", "updatedAt": "2019-01-12T10:59:38.363Z", "createdAt": "2019-01-12T10:59:38.363Z"},
      {"id": 6, "rolename":"Staff", "updatedAt": "2019-01-12T10:59:38.363Z", "createdAt": "2019-01-12T10:59:38.363Z"},
      {"id": 7, "rolename":"Junior Counsellor", "updatedAt": "2019-01-12T10:59:38.363Z", "createdAt": "2019-01-12T10:59:38.363Z"},
      {"id": 8, "rolename":"Staff baby", "updatedAt": "2019-01-12T10:59:38.363Z", "createdAt": "2019-01-12T10:59:38.363Z"},
      {"id": 9, "rolename":"Donor", "updatedAt": "2019-01-12T10:59:38.363Z", "createdAt": "2019-01-12T10:59:38.363Z"},
      {"id": 10, "rolename":"Junior Staff", "updatedAt": "2019-01-12T10:59:38.363Z", "createdAt": "2019-01-12T10:59:38.363Z"},
      {"id": 11, "rolename":"Speaker", "updatedAt": "2019-01-12T10:59:38.363Z", "createdAt": "2019-01-12T10:59:38.363Z"},
      {"id": 12, "rolename":"Junior Leader", "updatedAt": "2019-01-12T10:59:38.363Z", "createdAt": "2019-01-12T10:59:38.363Z"},
      {"id": 13, "rolename":"Host Family", "updatedAt": "2019-01-12T10:59:38.363Z", "createdAt": "2019-01-12T10:59:38.363Z"},
      {"id": 14, "rolename":"Chapter Support", "updatedAt": "2019-01-12T10:59:38.363Z", "createdAt": "2019-01-12T10:59:38.363Z"},
      {"id": 15, "rolename":"Observer", "updatedAt": "2019-01-12T10:59:38.363Z", "createdAt": "2019-01-12T10:59:38.363Z"},
      {"id": 16, "rolename":"Independent Participant", "updatedAt": "2019-01-12T10:59:38.363Z", "createdAt": "2019-01-12T10:59:38.363Z"},
      {"id": 17, "rolename":"Activity Administrator", "updatedAt": "2019-01-12T10:59:38.363Z", "createdAt": "2019-01-12T10:59:38.363Z"},
      {"id": 18, "rolename":"Trustee", "updatedAt": "2019-01-12T10:59:38.363Z", "createdAt": "2019-01-12T10:59:38.363Z"},
      {"id": 19, "rolename":"Committee Member", "updatedAt": "2019-01-12T10:59:38.363Z", "createdAt": "2019-01-12T10:59:38.363Z"},
      {"id": 20, "rolename":"Committee Chair", "updatedAt": "2019-01-12T10:59:38.363Z", "createdAt": "2019-01-12T10:59:38.363Z"},
      {"id": 21, "rolename":"Local Interchange coordinator", "updatedAt": "2019-01-12T10:59:38.363Z", "createdAt": "2019-01-12T10:59:38.363Z"},
      {"id": 22, "rolename":"National Interchange Coordinator", "updatedAt": "2019-01-12T10:59:38.363Z", "createdAt": "2019-01-12T10:59:38.363Z"},
      {"id": 23, "rolename":"Trainer", "updatedAt": "2019-01-12T10:59:38.363Z", "createdAt": "2019-01-12T10:59:38.363Z"},
      {"id": 24, "rolename":"RTF Coordinator", "updatedAt": "2019-01-12T10:59:38.363Z", "createdAt": "2019-01-12T10:59:38.363Z"}], {});
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
