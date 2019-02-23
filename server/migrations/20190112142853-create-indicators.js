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
      //validate: { len: 4 }
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
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  });
},
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Indicators');
  }
};
