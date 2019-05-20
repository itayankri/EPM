'use strict';
module.exports = (sequelize, DataTypes) => {
  const CampShop = sequelize.define('CampShop', {
      eventId: DataTypes.INTEGER,
      name: DataTypes.STRING,
      quantity: DataTypes.INTEGER,
  }, {});
    // associations can be defined here
  return CampShop;
};