'use strict';
module.exports = (sequelize, DataTypes) => {
  const EventRole = sequelize.define('EventRole', {
    rolename: DataTypes.STRING
  }, {});
  EventRole.associate = function(models) {
    EventRole.hasMany(models.Participations, {
      foreignKey: 'roleId',
      as: 'participations',
    });
  };
  return EventRole;
};