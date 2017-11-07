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
      type : DataTypes.user,      
      references :{
        model : user,
        key : '_id',
      }
    },

    user2: {
      type : DataTypes.user,      
      references :{
        model : user,
        key : '_id',
      }
    },

    concept: {
      type : DataTypes.concept,      
      references :{
        model : concept,
        key : '_id',
      }
    },
    
    ended : DataTypes.BOOLEAN,
    
  });
}
