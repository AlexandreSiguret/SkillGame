'use strict';

import User from "../user/user.model";
import Concept from "../concept/concept.model"
export default function(sequelize, DataTypes) {
  return sequelize.define('Game', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },

   /* utilisable quand meme via le systeme de clef etrangere
   user1: {
      type : DataTypes.INTEGER,      /*
      references :{
        model : User,
        key : '_id',
      }
    },*/
/* utilisable quand meme via le systeme de clef etrangere
    user2: {
      type : DataTypes.INTEGER,   /*   
      references :{
        model : User,
        key : '_id',
      }
    },*/
/*  Concept donne les informations sur le concept maintenant 
    concept: {
      type : DataTypes.INTEGER,      /*
      references :{
        model : Concept,
        key : '_id',
      }
    },*/
    
    ended : DataTypes.BOOLEAN,
    
  });
}
