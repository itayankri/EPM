'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Users', [
            {
                // USER 1
                "password": "user1",
                "firstName": "Itay",
                "middleName": "Middle",
                "lastName": "Ankri",
                "gender": true,
                "email": "user1@gmail.com",
                "homeNumber": "972-1-1234567",
                "cellphoneNumber": "972-51-1234567",
                "birthday": "1990-01-15T00:00:00.000Z",
                "country": "ecuador",
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
                "verificationCode": null,
                "isAdmin": false
            }, {
                // USER 2
                "password": "user2",
                "firstName": "Omer",
                "middleName": "middlename2",
                "lastName": "Glass",
                "gender": true,
                "email": "user2@gmail.com",
                "homeNumber": "972-2-1234567",
                "cellphoneNumber": "972-52-1234567",
                "birthday": "1990-02-15T00:00:00.000Z",
                "country": "argentina",
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
                "verificationCode": null,
                "isAdmin": true
            }, {
                // USER 3
                "password": "user3",
                "firstName": "Ziv",
                "middleName": "middlename3",
                "lastName": "Yatziv",
                "gender": true,
                "email": "user3@gmail.com",
                "homeNumber": "972-3-1234567",
                "cellphoneNumber": "972-53-1234567",
                "birthday": "1990-03-15T00:00:00.000Z",
                "country": "brazil",
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
                "verificationCode": null,
                "isAdmin": true
            }, {
                // USER 4
                "password": "user4",
                "firstName": "Nicol",
                "middleName": "middlename4",
                "lastName": "Kazinets",
                "gender": false,
                "email": "user4@gmail.com",
                "homeNumber": "972-4-1234567",
                "cellphoneNumber": "972-54-1234567",
                "birthday": "1990-04-15T00:00:00.000Z",
                "country": "norway",
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
                "verificationCode": null,
                "isAdmin": true
            }, {
                // USER 5
                "password": "user5",
                "firstName": "Shir",
                "middleName": "middlename5",
                "lastName": "Dinel",
                "gender": true,
                "email": "user5@gmail.com",
                "homeNumber": "972-5-1234567",
                "cellphoneNumber": "972-55-1234567",
                "birthday": "1990-05-15T00:00:00.000Z",
                "country": "france",
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
                "verificationCode": null,
                "isAdmin": true
            }, {
                // USER 6
                "password": "user6",
                "firstName": "Iris",
                "middleName": "middlename6",
                "lastName": "Dagan",
                "gender": false,
                "email": "user6@gmail.com",
                "homeNumber": "972-6-1234567",
                "cellphoneNumber": "972-56-1234567",
                "birthday": "1990-06-15T00:00:00.000Z",
                "country": "romania",
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
                "verificationCode": null,
                "isAdmin": true
            }, {
                // USER 7
                "password": "user7",
                "firstName": "Omri",
                "middleName": "middlename7",
                "lastName": "Shoval",
                "gender": true,
                "email": "user7@gmail.com",
                "homeNumber": "972-7-1234577",
                "cellphoneNumber": "972-57-1234577",
                "birthday": "1990-07-15T00:00:00.000Z",
                "country": "canada",
                "city": "city7",
                "address": "address7",
                "zipcode": "zipcode7",
                "chapter": "chapter7",
                "roleInNA": "role7",
                "languages": "{\"languages\": [\"lang7\",\"lang1\"]}",
                "allergies": "{\"allergies\": [\"allergy7\",\"allergy1\"]}",
                "swimming": false,
                "firstAid": false,
                "lifeSave": false,
                "updatedAt": "2019-01-12T10:59:38.373Z",
                "createdAt": "2019-01-12T10:59:38.373Z",
                "verificationCode": null,
                "isAdmin": true
            },
            {
                // USER 8
                "password": "user8",
                "firstName": "Yoav",
                "middleName": "middlename8",
                "lastName": "Yehudai",
                "gender": true,
                "email": "user8@gmail.com",
                "homeNumber": "972-8-1234587",
                "cellphoneNumber": "972-58-1234587",
                "birthday": "1990-08-15T00:00:00.000Z",
                "country": "sweden",
                "city": "city8",
                "address": "address8",
                "zipcode": "zipcode8",
                "chapter": "chapter8",
                "roleInNA": "role8",
                "languages": "{\"languages\": [\"lang8\",\"lang1\"]}",
                "allergies": "{\"allergies\": [\"allergy8\",\"allergy1\"]}",
                "swimming": false,
                "firstAid": false,
                "lifeSave": false,
                "updatedAt": "2019-01-12T10:59:38.383Z",
                "createdAt": "2019-01-12T10:59:38.383Z",
                "verificationCode": null,
                "isAdmin": true
            }, {
                // USER 9
                "password": "user9",
                "firstName": "Elad",
                "middleName": "middlename9",
                "lastName": "Pelach",
                "gender": true,
                "email": "user9@gmail.com",
                "homeNumber": "972-9-1234597",
                "cellphoneNumber": "972-59-1234597",
                "birthday": "1990-09-15T00:00:00.000Z",
                "country": "germany",
                "city": "city9",
                "address": "address9",
                "zipcode": "zipcode9",
                "chapter": "chapter9",
                "roleInNA": "role9",
                "languages": "{\"languages\": [\"lang9\",\"lang1\"]}",
                "allergies": "{\"allergies\": [\"allergy9\",\"allergy1\"]}",
                "swimming": false,
                "firstAid": false,
                "lifeSave": false,
                "updatedAt": "2019-01-12T10:59:38.393Z",
                "createdAt": "2019-01-12T10:59:38.393Z",
                "verificationCode": null,
                "isAdmin": true
            }, {
                // USER 10
                "password": "user10",
                "firstName": "Bar",
                "middleName": "middlename10",
                "lastName": "Almasli",
                "gender": false,
                "email": "user10@gmail.com",
                "homeNumber": "972-6-1234567",
                "cellphoneNumber": "972-56-1234567",
                "birthday": "1990-06-15T00:00:00.000Z",
                "country": "israel",
                "city": "city10",
                "address": "address10",
                "zipcode": "zipcode10",
                "chapter": "chapter10",
                "roleInNA": "role10",
                "languages": "{\"languages\": [\"lang10\",\"lang1\"]}",
                "allergies": "{\"allergies\": [\"allergy10\",\"allergy1\"]}",
                "swimming": false,
                "firstAid": false,
                "lifeSave": false,
                "updatedAt": "2019-01-12T10:59:38.363Z",
                "createdAt": "2019-01-12T10:59:38.363Z",
                "verificationCode": null,
                "isAdmin": true
            }, {
                // USER 11
                "password": "user11",
                "firstName": "Gal",
                "middleName": "middlename11",
                "lastName": "Yaniv",
                "gender": true,
                "email": "user11@gmail.com",
                "homeNumber": "972-6-1234567",
                "cellphoneNumber": "972-56-1234567",
                "birthday": "1990-06-15T00:00:00.000Z",
                "country": "france",
                "city": "city11",
                "address": "address11",
                "zipcode": "zipcode11",
                "chapter": "chapter11",
                "roleInNA": "role11",
                "languages": "{\"languages\": [\"lang11\",\"lang1\"]}",
                "allergies": "{\"allergies\": [\"allergy11\",\"allergy1\"]}",
                "swimming": false,
                "firstAid": false,
                "lifeSave": false,
                "updatedAt": "2019-01-12T10:59:38.363Z",
                "createdAt": "2019-01-12T10:59:38.363Z",
                "verificationCode": null,
                "isAdmin": true
            }, {
                // USER 12
                "password": "user12",
                "firstName": "Lara",
                "middleName": "middlename12",
                "lastName": "Amaruti",
                "gender": false,
                "email": "user12@gmail.com",
                "homeNumber": "972-6-1234567",
                "cellphoneNumber": "972-56-1234567",
                "birthday": "1990-06-15T00:00:00.000Z",
                "country": "france",
                "city": "city12",
                "address": "address12",
                "zipcode": "zipcode12",
                "chapter": "chapter12",
                "roleInNA": "role12",
                "languages": "{\"languages\": [\"lang12\",\"lang1\"]}",
                "allergies": "{\"allergies\": [\"allergy12\",\"allergy1\"]}",
                "swimming": false,
                "firstAid": false,
                "lifeSave": false,
                "updatedAt": "2019-01-12T10:59:38.363Z",
                "createdAt": "2019-01-12T10:59:38.363Z",
                "verificationCode": null,
                "isAdmin": true
            }, {
                // USER 13
                "password": "user13",
                "firstName": "Andu",
                "middleName": "middlename13",
                "lastName": "Amaruti",
                "gender": true,
                "email": "user13@gmail.com",
                "homeNumber": "972-6-1234567",
                "cellphoneNumber": "972-56-1234567",
                "birthday": "1990-06-15T00:00:00.000Z",
                "country": "france",
                "city": "city1",
                "address": "address13",
                "zipcode": "zipcode13",
                "chapter": "chapter1",
                "roleInNA": "role1",
                "languages": "{\"languages\": [\"lang2\",\"lang1\"]}",
                "allergies": "{\"allergies\": [\"allergy2\",\"allergy1\"]}",
                "swimming": false,
                "firstAid": false,
                "lifeSave": false,
                "updatedAt": "2019-01-12T10:59:38.363Z",
                "createdAt": "2019-01-12T10:59:38.363Z",
                "verificationCode": null,
                "isAdmin": true
            }, {
                // USER 14
                "password": "user14",
                "firstName": "Siri",
                "middleName": "middlename14",
                "lastName": "Torgaro",
                "gender": false,
                "email": "user14@gmail.com",
                "homeNumber": "972-6-1244567",
                "cellphoneNumber": "972-56-1244567",
                "birthday": "1990-06-15T00:00:00.000Z",
                "country": "norway",
                "city": "city1",
                "address": "address14",
                "zipcode": "zipcode14",
                "chapter": "chapter1",
                "roleInNA": "role1",
                "languages": "{\"languages\": [\"lang2\",\"lang1\"]}",
                "allergies": "{\"allergies\": [\"allergy2\",\"allergy1\"]}",
                "swimming": false,
                "firstAid": false,
                "lifeSave": false,
                "updatedAt": "2019-01-12T10:59:48.464Z",
                "createdAt": "2019-01-12T10:59:48.464Z",
                "verificationCode": null,
                "isAdmin": true
            }, {
                // USER 15
                "password": "user15",
                "firstName": "Thom",
                "middleName": "middlename15",
                "lastName": "Kunz",
                "gender": true,
                "email": "user15@gmail.com",
                "homeNumber": "972-6-1254567",
                "cellphoneNumber": "972-56-1254567",
                "birthday": "1990-06-15T00:00:00.000Z",
                "country": "norway",
                "city": "city1",
                "address": "address15",
                "zipcode": "zipcode15",
                "chapter": "chapter1",
                "roleInNA": "role1",
                "languages": "{\"languages\": [\"lang2\",\"lang1\"]}",
                "allergies": "{\"allergies\": [\"allergy2\",\"allergy1\"]}",
                "swimming": false,
                "firstAid": false,
                "lifeSave": false,
                "updatedAt": "2019-01-12T10:59:58.565Z",
                "createdAt": "2019-01-12T10:59:58.565Z",
                "verificationCode": null,
                "isAdmin": true
            }, {
                // USER 16
                "password": "user16",
                "firstName": "Kacper",
                "middleName": "middlename16",
                "lastName": "Smolinski",
                "gender": true,
                "email": "user16@gmail.com",
                "homeNumber": "972-6-1264567",
                "cellphoneNumber": "972-56-1264567",
                "birthday": "1990-06-15T00:00:00.000Z",
                "country": "norway",
                "city": "city1",
                "address": "address16",
                "zipcode": "zipcode16",
                "chapter": "chapter1",
                "roleInNA": "role1",
                "languages": "{\"languages\": [\"lang2\",\"lang1\"]}",
                "allergies": "{\"allergies\": [\"allergy2\",\"allergy1\"]}",
                "swimming": false,
                "firstAid": false,
                "lifeSave": false,
                "updatedAt": "2019-01-12T10:59:58.666Z",
                "createdAt": "2019-01-12T10:59:58.666Z",
                "verificationCode": null,
                "isAdmin": true
            }, {
                // USER 17
                "password": "user17",
                "firstName": "Karo",
                "middleName": "middlename17",
                "lastName": "Sefarin",
                "gender": false,
                "email": "user17@gmail.com",
                "homeNumber": "972-6-1274567",
                "cellphoneNumber": "972-56-1274567",
                "birthday": "1990-06-15T00:00:00.000Z",
                "country": "brazil",
                "city": "city1",
                "address": "address17",
                "zipcode": "zipcode17",
                "chapter": "chapter1",
                "roleInNA": "role1",
                "languages": "{\"languages\": [\"lang2\",\"lang1\"]}",
                "allergies": "{\"allergies\": [\"allergy2\",\"allergy1\"]}",
                "swimming": false,
                "firstAid": false,
                "lifeSave": false,
                "updatedAt": "2019-01-12T10:59:58.767Z",
                "createdAt": "2019-01-12T10:59:58.767Z",
                "verificationCode": null,
                "isAdmin": true
            }, {
                // USER 18
                "password": "user18",
                "firstName": "Tudor",
                "middleName": "middlename18",
                "lastName": "Baican",
                "gender": true,
                "email": "user18@gmail.com",
                "homeNumber": "972-6-1284567",
                "cellphoneNumber": "972-56-1284567",
                "birthday": "1990-06-15T00:00:00.000Z",
                "country": "brazil",
                "city": "city1",
                "address": "address18",
                "zipcode": "zipcode18",
                "chapter": "chapter1",
                "roleInNA": "role1",
                "languages": "{\"languages\": [\"lang2\",\"lang1\"]}",
                "allergies": "{\"allergies\": [\"allergy2\",\"allergy1\"]}",
                "swimming": false,
                "firstAid": false,
                "lifeSave": false,
                "updatedAt": "2019-01-12T10:59:58.868Z",
                "createdAt": "2019-01-12T10:59:58.868Z",
                "verificationCode": null,
                "isAdmin": true
            }, {
                // USER 19
                "password": "user19",
                "firstName": "Malina",
                "middleName": "middlename19",
                "lastName": "Simona",
                "gender": false,
                "email": "user19@gmail.com",
                "homeNumber": "972-6-1294567",
                "cellphoneNumber": "972-56-1294567",
                "birthday": "1990-06-15T00:00:00.000Z",
                "country": "brazil",
                "city": "city1",
                "address": "address19",
                "zipcode": "zipcode19",
                "chapter": "chapter1",
                "roleInNA": "role1",
                "languages": "{\"languages\": [\"lang2\",\"lang1\"]}",
                "allergies": "{\"allergies\": [\"allergy2\",\"allergy1\"]}",
                "swimming": false,
                "firstAid": false,
                "lifeSave": false,
                "updatedAt": "2019-01-12T10:59:58.969Z",
                "createdAt": "2019-01-12T10:59:58.969Z",
                "verificationCode": null,
                "isAdmin": true
            },
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
