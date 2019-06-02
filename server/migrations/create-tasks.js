'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
  return queryInterface.createTable('Tasks', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name: {
      allowNull: false,
      type: Sequelize.STRING
    },
    eventId: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
    description: {
      type: Sequelize.TEXT
    },
    completed: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
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
    return queryInterface.dropTable('Tasks');
  }
};
