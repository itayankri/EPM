'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Events', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      start: {
        allowNull: false,
        type: Sequelize.DATE,
        //validate: { isDate: true }
      },
      end: {
        allowNull: false,
        type: Sequelize.DATE,
        //validate: { isDate: true }
      },
      code: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      type: {
        allowNull: false,
        type: Sequelize.STRING
      },
      country: {
        allowNull: false,
        type: Sequelize.STRING
      },
      chapter: {
        allowNull: false,
        type: Sequelize.STRING
      },
      address: {
        allowNull: false,
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING,
        //validate: { isEmail: true }
      },
      participatingNAs: {
        type: Sequelize.JSONB
      },
      theme: {
        type: Sequelize.STRING
      },
      meetingPointName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      meetingPointAddress: {
        allowNull: false,
        type: Sequelize.STRING
      },
      meetingDate: {
        allowNull: false,
        type: Sequelize.DATE,
        //validate: { isDate: true }
      },
      nearestAirportName: {
        type: Sequelize.STRING
      },
      nearestAirportCode: {
        type: Sequelize.STRING(3),
        //validate: { len: 3 }
      },
      nearestTrainStation: {
        type: Sequelize.STRING
      },
      arriveBefore: {
        allowNull: false,
        type: Sequelize.DATE,
        //validate: { isDate: true }
      },
      leaveAfter: {
        allowNull: false,
        type: Sequelize.DATE,
        //validate: { isDate: true }
      },
      createdAt: {
        allowNull: false,
        defaultValue: Sequelize.NOW,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        defaultValue: Sequelize.NOW,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Events');
  }
};