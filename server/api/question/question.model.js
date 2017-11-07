'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('Question', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },

    question: DataTypes.STRING,
    
    owner: {
      type : DataTypes.user,      
      references :{
        model : user,
        key : '_id',
      }
    },

    nbAppearance : DataTypes.INTEGER,
    nbContestation : DataTypes.INTEGER,   

    concept: {
      type : DataTypes.concept,      
      references :{
        model : concept,
        key : '_id',
      }
    },
    goodAnswer : DataTypes.STRING,    
  });
}
