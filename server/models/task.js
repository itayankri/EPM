'use strict';
module.exports = (sequelize, DataTypes) => {
    const Task = sequelize.define('Task', {
        name: DataTypes.STRING,
        eventId: DataTypes.INTEGER,
        description: DataTypes.TEXT,
        completed: DataTypes.BOOLEAN,
        date: DataTypes.DATE
    }, {});
    Task.associate = function(models) {
        Task.belongsTo(models.Event, {
            foreignKey: 'eventId',
            onDelete: 'CASCADE',
        });
        // associations can be defined here
    };
    return Task;
};
  