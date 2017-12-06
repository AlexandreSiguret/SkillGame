'use strict';

import User from "../user/user.model";

export default function(sequelize, DataTypes) {
  return sequelize.define('Award', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    UserId : {
      type: DataTypes.INTEGER,
    },
    ConceptId : {
      type: DataTypes.INTEGER,
    },
    BadgeId : {
      type: DataTypes.INTEGER,
    },
    date : DataTypes.INTEGER,
    
    
  });
}
