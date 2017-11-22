'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('Badge', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    picture: DataTypes.STRING,
    description: DataTypes.STRING    
  });
}
