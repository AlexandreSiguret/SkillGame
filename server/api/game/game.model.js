'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('Game', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },

    user1: {
      type : DataTypes.INTEGER,      
      references :{
        model : DataTypes.User,
        key : '_id',
      }
    },

    user2: {
      type : DataTypes.INTEGER,      
      references :{
        model : DataTypes.User,
        key : '_id',
      }
    },

    concept: {
      type : DataTypes.INTEGER,      
      references :{
        model : DataTypes.Concept,
        key : '_id',
      }
    },
    
    ended : DataTypes.BOOLEAN,
    
  });
}
