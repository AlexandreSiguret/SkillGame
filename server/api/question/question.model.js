'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('Question', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },

    question: DataTypes.TEXT,
    
    owner: {
      type : DataTypes.INTEGER,      
      references :{
        model : DataTypes.User,
        key : '_id',
      }
    },

    nbAppearance : DataTypes.INTEGER,
    nbContestation : DataTypes.INTEGER,   

    concept: {
      type : DataTypes.INTEGER,      
      references :{
        model : DataTypes.Concept,
        key : '_id',
      }
    },
    goodAnswer : DataTypes.STRING,    
  });
}
