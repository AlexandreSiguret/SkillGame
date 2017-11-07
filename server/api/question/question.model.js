'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('Question', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    enonce: DataTypes.STRING,
    proprietaire : DataTypes.user,
    nbApparition : DataTypes.INTEGER,
    nbContestation : DataTypes.INTEGER,
    concept : DataTypes.concept,
    bonneReponse : DataTypes.STRING,    
  });
}
