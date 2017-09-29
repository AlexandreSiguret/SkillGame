'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('Concept', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    
  });
}
