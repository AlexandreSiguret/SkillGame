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
      type : DataTypes.question,      
      references :{
        model : question,
        key : '_id',
      }
    },

    choice: {
      type : DataTypes.choice,      
      references :{
        model : choice,
        key : '_id',
      }
    },    
    earnedPoint : DataTypes.INTEGER,

    user: {
      type : DataTypes.user,      
      references :{
        model : user,
        key : '_id',
      }
    },
    
    quizz: {
      type : DataTypes.quizz,      
      references :{
        model : quizz,
        key : '_id',
      }
    },
  });
}

