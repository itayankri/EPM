'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    password: DataTypes.STRING,
    firstName: DataTypes.STRING,
    middleName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    homeNumber: DataTypes.STRING,
    cellphoneNumber: DataTypes.STRING,
    birthday: DataTypes.DATE,
    country: DataTypes.STRING,
    city: DataTypes.STRING,
    address: DataTypes.STRING,
    zipcode: DataTypes.STRING,
    chapter: DataTypes.STRING,
    roleInNA: DataTypes.STRING,
    languages: DataTypes.JSONB,
    allergies: DataTypes.JSONB,
    swimming: DataTypes.BOOLEAN,
    firstAid: DataTypes.BOOLEAN,
    lifeSave: DataTypes.BOOLEAN,
    verificationCode: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    User.hasMany(models.Participations, {
      foreignKey: 'userId',
      as: 'participations',
    });
    // associations can be defined here
  };
  return User;
};