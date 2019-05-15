'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        /*
          Add altering commands here.
          Return a promise to correctly handle asynchronicity.

          Example:
          return queryInterface.createTable('users', { id: Sequelize.INTEGER });
        */
        return queryInterface.createTable('BlogMessages', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            eventId: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            userId: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            likes: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            content: {
                allowNull: false,
                type: Sequelize.TEXT
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
        /*
          Add reverting commands here.
          Return a promise to correctly handle asynchronicity.

          Example:
          return queryInterface.dropTable('users');
        */
        return queryInterface.dropTable('BlogMessages');
    }
};
