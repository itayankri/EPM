'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Events', [{
      // VILLAGE 1
      "id": 1,
      "start": "2019-01-13T00:00:00.000Z",
      "end": "2019-02-13T00:00:00.000Z",
      "code": "V-2019-001",
      "country": "israel",
      "chapter": "tel-aviv",
      "type": "village",
      "address": "fake camp address 1",
      "email": "camp1@camp1.com",
      "participatingNAs": "{\"NAs\": [\"country1\",\"country2\"]}",
      "theme": "black",
      "meetingPointName": "meeting point 1",
      "meetingPointAddress": "fake address 1, tel aviv",
      "meetingDate": "2019-01-10T00:00:00.000Z",
      "nearestAirportName": "fake airport 1",
      "nearestAirportCode": "FA1",
      "nearestTrainStation": "fake train 1",
      "arriveBefore": "2019-01-09T00:00:00.000Z",
      "leaveAfter": "2019-02-14T00:00:00.000Z",
      "updatedAt": "2019-01-12T09:37:46.207Z",
      "createdAt": "2019-01-12T09:37:46.207Z"},{
        // VILLAGE 2
      "id": 2,
      "start": "2019-02-01T00:00:00.000Z",
      "end": "2019-03-01T00:00:00.000Z",
      "code": "V-2019-002",
      "country": "slovakia",
      "chapter": "bratislava",
      "type": "village",
      "address": "fake camp address 2",
      "email": "camp2@camp2.com",
      "participatingNAs": "{\"NAs\": [\"country2\",\"country3\"]}",
      "theme": "white",
      "meetingPointName": "meeting point 2",
      "meetingPointAddress": "fake address 2, bratislava",
      "meetingDate": "2019-01-28T00:00:00.000Z",
      "nearestAirportName": "fake airport 2",
      "nearestAirportCode": "FA2",
      "nearestTrainStation": "fake train 2",
      "arriveBefore": "2019-01-27T00:00:00.000Z",
      "leaveAfter": "2019-03-02T00:00:00.000Z",
      "updatedAt": "2019-01-12T09:37:46.207Z",
      "createdAt": "2019-01-12T09:37:46.207Z"},{
      // STEP UP 1
      "id": 3,
      "start": "2019-03-13T00:00:00.000Z",
      "end": "2019-04-14T00:00:00.000Z",
      "code": "C-2019-001",
      "country": "iran",
      "chapter": "tehran",
      "type": "step up",
      "address": "fake camp address 3",
      "email": "camp3@camp3.com",
      "participatingNAs": "{\"NAs\": [\"country3\",\"country4\"]}",
      "theme": "red",
      "meetingPointName": "meeting point 3",
      "meetingPointAddress": "fake address 3, tehran",
      "meetingDate": "2019-03-10T00:00:00.000Z",
      "nearestAirportName": "fake airport 3",
      "nearestAirportCode": "FA3",
      "nearestTrainStation": "fake train 3",
      "arriveBefore": "2019-03-09T00:00:00.000Z",
      "leaveAfter": "2019-04-14T00:00:00.000Z",
      "updatedAt": "2019-01-12T09:37:46.207Z",
      "createdAt": "2019-01-12T09:37:46.207Z"},{
      // STEP UP 2
      "id": 4,
      "start": "2019-04-13T00:00:00.000Z",
      "end": "2019-05-14T00:00:00.000Z",
      "code": "C-2019-002",
      "country": "japan",
      "chapter": "tokyo",
      "type": "step up",
      "address": "fake camp address 4",
      "email": "camp4@camp4.com",
      "participatingNAs": "{\"NAs\": [\"country4\",\"country5\"]}",
      "theme": "green",
      "meetingPointName": "meeting point 4",
      "meetingPointAddress": "fake address 4, tokyo",
      "meetingDate": "2019-04-10T00:00:00.000Z",
      "nearestAirportName": "fake airport 4",
      "nearestAirportCode": "FA4",
      "nearestTrainStation": "fake train 4",
      "arriveBefore": "2019-04-09T00:00:00.000Z",
      "leaveAfter": "2019-05-14T00:00:00.000Z",
      "updatedAt": "2019-01-12T09:37:46.207Z",
      "createdAt": "2019-01-12T09:37:46.207Z"},{
      // SEMINAR 1
      "id": 5,
      "start": "2019-05-13T00:00:00.000Z",
      "end": "2019-06-14T00:00:00.000Z",
      "code": "S-2019-001",
      "country": "brazil",
      "chapter": "brasilia",
      "type": "seminar",
      "address": "fake camp address 5",
      "email": "camp5@camp5.com",
      "participatingNAs": "{\"NAs\": [\"country5\",\"country6\"]}",
      "theme": "blue",
      "meetingPointName": "meeting point 5",
      "meetingPointAddress": "fake address 5, brasilia",
      "meetingDate": "2019-05-10T00:00:00.000Z",
      "nearestAirportName": "fake airport 5",
      "nearestAirportCode": "FA5",
      "nearestTrainStation": "fake train 5",
      "arriveBefore": "2019-05-09T00:00:00.000Z",
      "leaveAfter": "2019-06-14T00:00:00.000Z",
      "updatedAt": "2019-01-12T09:37:46.207Z",
      "createdAt": "2019-01-12T09:37:46.207Z"},{
      // SEMINAR 2
      "id": 6,
      "start": "2019-06-13T00:00:00.000Z",
      "end": "2019-07-14T00:00:00.000Z",
      "code": "S-2019-002",
      "country": "nigeria",
      "chapter": "abuja",
      "type": "seminar",
      "address": "fake camp address 6",
      "email": "camp6@camp6.com",
      "participatingNAs": "{\"NAs\": [\"country6\",\"country1\"]}",
      "theme": "yellow",
      "meetingPointName": "meeting point 6",
      "meetingPointAddress": "fake address 6, abuja",
      "meetingDate": "2019-06-10T00:00:00.000Z",
      "nearestAirportName": "fake airport 6",
      "nearestAirportCode": "FA6",
      "nearestTrainStation": "fake train 6",
      "arriveBefore": "2019-06-09T00:00:00.000Z",
      "leaveAfter": "2019-07-14T00:00:00.000Z",
      "updatedAt": "2019-01-12T09:37:46.207Z",
      "createdAt": "2019-01-12T09:37:46.207Z"},
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
