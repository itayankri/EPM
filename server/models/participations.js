'use strict';
module.exports = (sequelize, DataTypes) => {
  const Participations = sequelize.define('Participations', {
    eventId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    roleId: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {});
  Participations.associate = function(models) {
    Participations.belongsTo(models.Event, {
      foreignKey: 'eventId',
      onDelete: 'CASCADE',
    });
    Participations.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
    Participations.belongsTo(models.EventRole, {
      foreignKey: 'roleId',
      onDelete: 'CASCADE',
    });
    // associations can be defined here
  };
  // Participations.associate = function(models) {
  //   Participations.hasMany(models.User, {
  //     foreignKey: 'userId',
  //     as: 'users',
  //   });
  //   // associations can be defined here
  // };
  return Participations;
};