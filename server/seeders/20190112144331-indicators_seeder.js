'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Indicators', [{
      // USER 1
      "year":2017,
      "eventType":"village",
      "indicators":JSON.stringify([{"name":"Develop intercultural competence","indicators":[
                                      {"name":"Show knowledge of own culture and reflect on it","type":"K"},
                                      {"name":"Show knowledge of other cultures","type":"K"},
                                      {"name":"Be open-minded about new ideas","type":"A"},
                                      {"name":"Reflect on new knowledge about other cultures","type":"S"}]},
                                    {"name":"Contribute to an inclusive community","indicators":[
                                      {"name":"Interact with participants from other countries","type":"A"},
                                      {"name":"Understand the importance of trust within friendship","type":"K"},
                                      {"name":"Understand the benefits of including others","type":"K"},
                                      {"name":"Contribute towards an inclusive community","type":"A"}]},
                                    {"name":"Demonstrate positive attitudes towards others","indicators":[
                                      {"name":"Respect other people's points of view","type":"A"},
                                      {"name":"Respond positively to challenges","type":"A"},
                                      {"name":"Demonstrate care for others","type":"A"},
                                      {"name":"Respect the feelings and belongings of others","type":"A"}]},
                                    {"name":"Develop an interest in peace education","indicators":[
                                      {"name":"Participate in peace education activities","type":"A"},
                                      {"name":"Reflect on learning from peace education activities","type":"K"},
                                      {"name":"Share learning with other participants","type":"S"},
                                      {"name":"Connect peace education to everyday life","type":"K"}]}]),
      "updatedAt": "2019-01-12T10:59:38.363Z",
      "createdAt": "2019-01-12T10:59:38.363Z"
      }, {
      "year":2017,
      "eventType":"step up",
      "indicators":JSON.stringify([{"name":"Develop leadership skills","indicators":[
                                      {"name":"Express personal ideas to promote group development","type":"S"},
                                      {"name":"Suggest solutions to conflicts","type":"KS"},
                                      {"name":"Facilitate a group","type":"S"},
                                      {"name":"Take responsibility for an activity, project or problem","type":"S"}]},
                                    {"name":"Be willing to take initiative in own community","indicators":[
                                      {"name":"Identify issues and conflicts in own community","type":"K"},
                                      {"name":"Show willingness to contribute to own community","type":"A"},
                                      {"name":"Identify ways to use new knowledge in everyday life","type":"S"},
                                      {"name":"Act inclusively towards others","type":"S"}]},
                                    {"name":"Increase awareness of the world","indicators":[
                                      {"name":"Increase knowledge of current social issues","type":"K"},
                                      {"name":"Cooperate with people from different cultures","type":"A"},
                                      {"name":"Understand and contribute to the development of camp theme","type":"A"},
                                      {"name":"Participate in discussions about the content area of the year","type":"K"}]},
                                    {"name":"Develop as a person","indicators":[
                                      {"name":"Show confidence in group discussions and activities","type":"S"},
                                      {"name":"Plan and run activities","type":"S"},
                                      {"name":"Work as part of a team","type":"S"},
                                      {"name":"Listen to others' ideas and be open-minded to different points of view","type":"A"}]}]),
      "updatedAt": "2019-01-12T10:59:38.363Z",
      "createdAt": "2019-01-12T10:59:38.363Z"
      }], {});
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
