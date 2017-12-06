'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('Alonescore', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    
    alonescore: DataTypes.INTEGER,
  });
}
