'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('Game', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    info: DataTypes.STRING,
    active: DataTypes.BOOLEAN
  });
}
