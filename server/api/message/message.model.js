'use strict';

import User from "../user/user.model";

export default function(sequelize, DataTypes) {
  return sequelize.define('Message', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    expediteur: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    },

    destinataire: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    },

    msg_type: {
      type : DataTypes.INTEGER,
    },
    message: {
        type : DataTypes.STRING, 
      }
    
  });
}
