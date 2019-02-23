'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('EventRoles', [
      {"rolename":"Participant", "updatedAt": "2019-01-12T10:59:38.363Z", "createdAt": "2019-01-12T10:59:38.363Z"},
      {"rolename":"Leader", "updatedAt": "2019-01-12T10:59:38.363Z", "createdAt": "2019-01-12T10:59:38.363Z"},
      {"rolename":"Kitchen Staff", "updatedAt": "2019-01-12T10:59:38.363Z", "createdAt": "2019-01-12T10:59:38.363Z"},
      {"rolename":"Director", "updatedAt": "2019-01-12T10:59:38.363Z", "createdAt": "2019-01-12T10:59:38.363Z"},
      {"rolename":"International Staff", "updatedAt": "2019-01-12T10:59:38.363Z", "createdAt": "2019-01-12T10:59:38.363Z"},
      {"rolename":"Staff", "updatedAt": "2019-01-12T10:59:38.363Z", "createdAt": "2019-01-12T10:59:38.363Z"},
      {"rolename":"Junior Counsellor", "updatedAt": "2019-01-12T10:59:38.363Z", "createdAt": "2019-01-12T10:59:38.363Z"},
      {"rolename":"Staff baby", "updatedAt": "2019-01-12T10:59:38.363Z", "createdAt": "2019-01-12T10:59:38.363Z"},
      {"rolename":"Donor", "updatedAt": "2019-01-12T10:59:38.363Z", "createdAt": "2019-01-12T10:59:38.363Z"},
      {"rolename":"Junior Staff", "updatedAt": "2019-01-12T10:59:38.363Z", "createdAt": "2019-01-12T10:59:38.363Z"},
      {"rolename":"Speaker", "updatedAt": "2019-01-12T10:59:38.363Z", "createdAt": "2019-01-12T10:59:38.363Z"},
      {"rolename":"Junior Leader", "updatedAt": "2019-01-12T10:59:38.363Z", "createdAt": "2019-01-12T10:59:38.363Z"},
      {"rolename":"Host Family", "updatedAt": "2019-01-12T10:59:38.363Z", "createdAt": "2019-01-12T10:59:38.363Z"},
      {"rolename":"Chapter Support", "updatedAt": "2019-01-12T10:59:38.363Z", "createdAt": "2019-01-12T10:59:38.363Z"},
      {"rolename":"Observer", "updatedAt": "2019-01-12T10:59:38.363Z", "createdAt": "2019-01-12T10:59:38.363Z"},
      {"rolename":"Independent Participant", "updatedAt": "2019-01-12T10:59:38.363Z", "createdAt": "2019-01-12T10:59:38.363Z"},
      {"rolename":"Activity Administrator", "updatedAt": "2019-01-12T10:59:38.363Z", "createdAt": "2019-01-12T10:59:38.363Z"},
      {"rolename":"Trustee", "updatedAt": "2019-01-12T10:59:38.363Z", "createdAt": "2019-01-12T10:59:38.363Z"},
      {"rolename":"Committee Member", "updatedAt": "2019-01-12T10:59:38.363Z", "createdAt": "2019-01-12T10:59:38.363Z"},
      {"rolename":"Committee Chair", "updatedAt": "2019-01-12T10:59:38.363Z", "createdAt": "2019-01-12T10:59:38.363Z"},
      {"rolename":"Local Interchange coordinator", "updatedAt": "2019-01-12T10:59:38.363Z", "createdAt": "2019-01-12T10:59:38.363Z"},
      {"rolename":"National Interchange Coordinator", "updatedAt": "2019-01-12T10:59:38.363Z", "createdAt": "2019-01-12T10:59:38.363Z"},
      {"rolename":"Trainer", "updatedAt": "2019-01-12T10:59:38.363Z", "createdAt": "2019-01-12T10:59:38.363Z"},
      {"rolename":"RTF Coordinator", "updatedAt": "2019-01-12T10:59:38.363Z", "createdAt": "2019-01-12T10:59:38.363Z"}], {});
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
