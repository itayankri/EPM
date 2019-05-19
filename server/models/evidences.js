'use strict';
module.exports = (sequelize, DataTypes) => {
  const Evidences = sequelize.define('Evidences', {
    userId: DataTypes.INTEGER,
    eventId: DataTypes.INTEGER,
    indicatorsId: DataTypes.INTEGER,
    values: DataTypes.JSONB,
  }, {});
  // Participations.associate = function(models) {
  //   Participations.hasMany(models.User, {
  //     foreignKey: 'userId',
  //     as: 'users',
  //   });
  //   // associations can be defined here
  // };
  return Evidences;
};