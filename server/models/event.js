'use strict';
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    start: DataTypes.DATE,
    end: DataTypes.DATE,
    country: DataTypes.STRING,
    chapter: DataTypes.STRING
  }, {});
  Event.associate = function(models) {
    Event.hasMany(models.Participations, {
      foreignKey: 'eventId',
      as: 'participations',
    });
    // associations can be defined here
  };
  return Event;
};