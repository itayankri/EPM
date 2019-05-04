'use strict';
module.exports = (sequelize, DataTypes) => {
    const BlogMessage = sequelize.define('BlogMessage', {
        userId: DataTypes.INTEGER,
        eventId: DataTypes.INTEGER,
        content: DataTypes.STRING
    }, {});
    BlogMessage.associate = function(models) {
        BlogMessage.belongsTo(models.Event, {
            foreignKey: 'eventId',
            onDelete: 'CASCADE',
        });
        BlogMessage.belongsTo(models.User, {
            foreignKey: 'userId',
            onDelete: 'CASCADE',
        });
        // associations can be defined here
    };
    return BlogMessage;
};