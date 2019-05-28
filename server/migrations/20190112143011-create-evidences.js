'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
  return queryInterface.createTable('Evidences', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    userId: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
    eventId: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
    values: {
      type: Sequelize.JSONB
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
    return queryInterface.dropTable('Evidences');
  }
};
