'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('Award', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    badgeCount: DataTypes.INTEGER,
    date: DataTypes.INTEGER,
 
  });
}
