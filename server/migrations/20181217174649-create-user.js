'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      firstName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      middleName: {
        type: Sequelize.STRING
      },
      lastName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      gender: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
        //validate: { isEmail: true }
      },
      homeNumber: {
        type: Sequelize.STRING
      },
      cellphoneNumber: {
        type: Sequelize.STRING
      },
      birthday: {
        allowNull: false,
        type: Sequelize.DATE,
        //validate: { isDate: true }
      },
      country: {
        allowNull: false,
        type: Sequelize.STRING
      },
      city: {
        allowNull: false,
        type: Sequelize.STRING
      },
      address: {
        allowNull: false,
        type: Sequelize.STRING
      },
      zipcode: {
        type: Sequelize.STRING
      },
      chapter: {
        allowNull: false,
        type: Sequelize.STRING
      },
      roleInNA: {
        type: Sequelize.STRING
      },
      languages: {
        allowNull: false,
        type: Sequelize.JSONB
      },
      allergies: {
        type: Sequelize.JSONB
      },
      swimming: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      firstAid: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      lifeSave: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      verificationCode: {
        type: Sequelize.STRING
      },
      isAdmin: {
        allowNull: false,
        type: Sequelize.BOOLEAN
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
    return queryInterface.dropTable('Users');
  }
};