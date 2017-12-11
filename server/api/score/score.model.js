'use strict';
export default function(sequelize, DataTypes) {
  return sequelize.define('Score', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    score: DataTypes.INTEGER,
  });
}
