'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('Answer', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },

    question: {
      type : DataTypes.INTEGER,      
      references :{
        model : DataTypes.Question,
        key : '_id',
      }
    },

    choice: {
      type : DataTypes.INTEGER,      
      references :{
        model : DataTypes.choice,
        key : '_id',
      }
    },    
    earnedPoint : DataTypes.INTEGER,

    user: {
      type : DataTypes.INTEGER,      
      references :{
        model : DataTypes.User,
        key : '_id',
      }
    },
    
    quizz: {
      type : DataTypes.INTEGER,      
      references :{
        model : DataTypes.Game,
        key : '_id',
      }
    },
  });
}

