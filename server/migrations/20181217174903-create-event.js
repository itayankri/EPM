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
        type: Sequelize.DATE
      },
      end: {
        type: Sequelize.DATE
      },
      type: {
        type: Sequelize.STRING
      },
      country: {
        type: Sequelize.STRING
      },
      chapter: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      participatingNAs: {
        type: Sequelize.JSONB
      },
      theme: {
        type: Sequelize.STRING
      },
      meetingPointName: {
        type: Sequelize.STRING
      },
      meetingPointAddress: {
        type: Sequelize.STRING
      },
      meetingDate: {
        type: Sequelize.DATE
      },
      nearestAirportName: {
        type: Sequelize.STRING
      },
      nearestAirportCode: {
        type: Sequelize.STRING(3)
      },
      nearestTrainStation: {
        type: Sequelize.STRING
      },
      arriveBefore: {
        type: Sequelize.DATE
      },
      leaveAfter: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Events');
  }
};