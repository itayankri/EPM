'use strict';
module.exports = (sequelize, DataTypes) => {
  const Indicators = sequelize.define('Indicators', {
    year: DataTypes.INTEGER,
    eventType: DataTypes.STRING,
    indicators: DataTypes.JSONB,
  }, {});
  // Participations.associate = function(models) {
  //   Participations.hasMany(models.User, {
  //     foreignKey: 'userId',
  //     as: 'users',
  //   });
  //   // associations can be defined here
  // };
  return Indicators;
};