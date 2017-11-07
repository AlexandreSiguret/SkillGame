'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('Choice', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    question: {
      type : DataTypes.question,      
      references :{
        model : question,
        key : '_id',
      }
    },

    statement : DataTypes.STRING,
    
  });
}
