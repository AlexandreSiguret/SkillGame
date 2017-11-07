'use strict';

import User from "../user/user.model";
import Concept from "../concept/concept.model"
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
      type : DataTypes.INTEGER,      
      references :{
        model : User,
        key : '_id',
      }
    },

    nbAppearance : DataTypes.INTEGER,
    nbContestation : DataTypes.INTEGER,   

    concept: {
      type : DataTypes.INTEGER,      
      references :{
        model : Concept,
        key : '_id',
      }
    },
    goodAnswer : DataTypes.STRING,    
  });
}
