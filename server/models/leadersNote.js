'use strict';
module.exports = (sequelize, DataTypes) => {
    const LeadersNote = sequelize.define('LeadersNote', {
        eventId: DataTypes.INTEGER,
        content: DataTypes.TEXT,
        date: DataTypes.DATE
    }, {});
    LeadersNote.associate = function(models) {
        LeadersNote.belongsTo(models.Event, {
            foreignKey: 'eventId',
            onDelete: 'CASCADE',
        });
        // associations can be defined here
    };
    return LeadersNote;
};