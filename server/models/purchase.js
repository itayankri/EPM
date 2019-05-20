'use strict';
module.exports = (sequelize, DataTypes) => {
    const Purchase = sequelize.define('Purchase', {
        userId: DataTypes.INTEGER,
        eventId: DataTypes.INTEGER,
        itemName: DataTypes.STRING,
        quantity: DataTypes.INTEGER,
        purchaseDate: DataTypes.DATE
    }, {});
    Purchase.associate = function(models) {
        Purchase.belongsTo(models.Event, {
            foreignKey: 'eventId',
            onDelete: 'CASCADE',
        });
        Purchase.belongsTo(models.User, {
            foreignKey: 'userId',
            onDelete: 'CASCADE',
        });
        // associations can be defined here
    };
    return Purchase;
};