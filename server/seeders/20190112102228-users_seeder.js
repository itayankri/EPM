'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      // USER 1
      "id": 1,
      "password": "user1",
      "firstName": "firstname1",
      "middleName": "middlename1",
      "lastName": "lastname1",
      "email": "user1@gmail.com",
      "homeNumber": "972-1-1234567",
      "cellphoneNumber": "972-51-1234567",
      "birthday": "1990-01-15T00:00:00.000Z",
      "country": "country1",
      "city": "city1",
      "address": "address1",
      "zipcode": "zipcode1",
      "chapter": "chapter1",
      "roleInNA": "role1",
      "languages": "{\"languages\": [\"lang1\",\"lang2\"]}",
      "allergies": "{\"allergies\": [\"allergy1\",\"allergy2\"]}",
      "swimming": true,
      "firstAid": true,
      "lifeSave": true,
      "updatedAt": "2019-01-12T10:59:38.363Z",
      "createdAt": "2019-01-12T10:59:38.363Z",
      "verificationCode": null}, {
      // USER 2
      "id": 2,
      "password": "user2",
      "firstName": "firstname2",
      "middleName": "middlename2",
      "lastName": "lastname2",
      "email": "user2@gmail.com",
      "homeNumber": "972-2-1234567",
      "cellphoneNumber": "972-52-1234567",
      "birthday": "1990-02-15T00:00:00.000Z",
      "country": "country2",
      "city": "city2",
      "address": "address2",
      "zipcode": "zipcode2",
      "chapter": "chapter2",
      "roleInNA": "role2",
      "languages": "{\"languages\": [\"lang2\",\"lang3\"]}",
      "allergies": "{\"allergies\": [\"allergy2\",\"allergy3\"]}",
      "swimming": true,
      "firstAid": true,
      "lifeSave": false,
      "updatedAt": "2019-01-12T10:59:38.363Z",
      "createdAt": "2019-01-12T10:59:38.363Z",
      "verificationCode": null}, {
      // USER 3
      "id": 3,
      "password": "user3",
      "firstName": "firstname3",
      "middleName": "middlename3",
      "lastName": "lastname3",
      "email": "user3@gmail.com",
      "homeNumber": "972-3-1234567",
      "cellphoneNumber": "972-53-1234567",
      "birthday": "1990-03-15T00:00:00.000Z",
      "country": "country3",
      "city": "city3",
      "address": "address3",
      "zipcode": "zipcode3",
      "chapter": "chapter3",
      "roleInNA": "role3",
      "languages": "{\"languages\": [\"lang3\",\"lang4\"]}",
      "allergies": "{\"allergies\": [\"allergy3\",\"allergy4\"]}",
      "swimming": true,
      "firstAid": false,
      "lifeSave": true,
      "updatedAt": "2019-01-12T10:59:38.363Z",
      "createdAt": "2019-01-12T10:59:38.363Z",
      "verificationCode": null}, {
      // USER 4
      "id": 4,
      "password": "user4",
      "firstName": "firstname4",
      "middleName": "middlename4",
      "lastName": "lastname4",
      "email": "user4@gmail.com",
      "homeNumber": "972-4-1234567",
      "cellphoneNumber": "972-54-1234567",
      "birthday": "1990-04-15T00:00:00.000Z",
      "country": "country4",
      "city": "city4",
      "address": "address4",
      "zipcode": "zipcode4",
      "chapter": "chapter4",
      "roleInNA": "role4",
      "languages": "{\"languages\": [\"lang4\",\"lang5\"]}",
      "allergies": "{\"allergies\": [\"allergy4\",\"allergy5\"]}",
      "swimming": true,
      "firstAid": false,
      "lifeSave": false,
      "updatedAt": "2019-01-12T10:59:38.363Z",
      "createdAt": "2019-01-12T10:59:38.363Z",
      "verificationCode": null}, {
      // USER 5
      "id": 5,
      "password": "user5",
      "firstName": "firstname5",
      "middleName": "middlename5",
      "lastName": "lastname5",
      "email": "user5@gmail.com",
      "homeNumber": "972-5-1234567",
      "cellphoneNumber": "972-55-1234567",
      "birthday": "1990-05-15T00:00:00.000Z",
      "country": "country5",
      "city": "city5",
      "address": "address5",
      "zipcode": "zipcode5",
      "chapter": "chapter5",
      "roleInNA": "role5",
      "languages": "{\"languages\": [\"lang5\",\"lang6\"]}",
      "allergies": "{\"allergies\": [\"allergy5\",\"allergy6\"]}",
      "swimming": false,
      "firstAid": true,
      "lifeSave": true,
      "updatedAt": "2019-01-12T10:59:38.363Z",
      "createdAt": "2019-01-12T10:59:38.363Z",
      "verificationCode": null}, {
      // USER 6
      "id": 6,
      "password": "user6",
      "firstName": "firstname6",
      "middleName": "middlename6",
      "lastName": "lastname6",
      "email": "user6@gmail.com",
      "homeNumber": "972-6-1234567",
      "cellphoneNumber": "972-56-1234567",
      "birthday": "1990-06-15T00:00:00.000Z",
      "country": "country6",
      "city": "city6",
      "address": "address6",
      "zipcode": "zipcode6",
      "chapter": "chapter6",
      "roleInNA": "role6",
      "languages": "{\"languages\": [\"lang6\",\"lang1\"]}",
      "allergies": "{\"allergies\": [\"allergy6\",\"allergy1\"]}",
      "swimming": false,
      "firstAid": false,
      "lifeSave": false,
      "updatedAt": "2019-01-12T10:59:38.363Z",
      "createdAt": "2019-01-12T10:59:38.363Z",
      "verificationCode": null},
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
