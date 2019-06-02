'use strict';
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    start: DataTypes.DATE,
    end: DataTypes.DATE,
    code: DataTypes.STRING,
    country: DataTypes.STRING,
    chapter: DataTypes.STRING,
    address: DataTypes.STRING,
    email: DataTypes.STRING,
    type: DataTypes.STRING,
    participatingNAs: DataTypes.JSONB,
    theme: DataTypes.STRING,
    meetingPointName: DataTypes.STRING,
    meetingPointAddress: DataTypes.STRING,
    meetingDate: DataTypes.DATE,
    nearestAirportName: DataTypes.STRING,
    nearestAirportCode: DataTypes.STRING(3),
    nearestTrainStation: DataTypes.STRING,
    arriveBefore: DataTypes.DATE,
    leaveAfter: DataTypes.DATE
  }, {});
  Event.associate = function(models) {
    Event.hasMany(models.Participations, {
      foreignKey: 'eventId',
      as: 'participations',
    });

    Event.hasMany(models.BlogMessage, {
      foreignKey: 'eventId',
    });

    Event.hasMany(models.Task, {
      foreignKey: 'eventId',
    });

    Event.hasMany(models.LeadersNote, {
      foreignKey: 'eventId',
    });
    // associations can be defined here
  };
  return Event;
};