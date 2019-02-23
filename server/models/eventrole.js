'use strict';
module.exports = (sequelize, DataTypes) => {
  const EventRole = sequelize.define('EventRoles', {
    rolename: DataTypes.STRING
  }, {});
  EventRole.associate = function(models) {
    // associations can be defined here
  };
  return EventRole;
};