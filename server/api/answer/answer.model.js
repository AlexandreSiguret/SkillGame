'use strict';

import User from "../user/user.model";
import Game from "../game/game.model"
import Question from "../question/question.model"
import Choice from "../choice/choice.model"


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
        model : Question,
        key : '_id',
      }
    },

    choice: {
      type : DataTypes.INTEGER,      
      references :{
        model : Choice,
        key : '_id',
      }
    },    
    earnedPoint : DataTypes.INTEGER,

    user: {
      type : DataTypes.INTEGER,      
      references :{
        model : User,
        key : '_id',
      }
    },
    
    quizz: {
      type : DataTypes.INTEGER,      
      references :{
        model : Game,
        key : '_id',
      }
    },
  });
}

