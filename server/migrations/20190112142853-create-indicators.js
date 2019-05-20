'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
  return queryInterface.createTable('Indicators', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    year: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
    eventType: {
      allowNull: false,
      type: Sequelize.STRING
    },
    indicators: {
      allowNull: false,
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
    return queryInterface.dropTable('Indicators');
  }
};
