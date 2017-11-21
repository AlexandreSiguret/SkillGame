/**
 * Sequelize initialization module
 */

'use strict';

import path from 'path';
import config from '../config/environment';
import Sequelize from 'sequelize';

var db = {
  Sequelize,
  sequelize: new Sequelize(config.sequelize.uri, config.sequelize.options)
};

// Insert models below
db.Answer = db.sequelize.import('../api/answer/answer.model');
db.Choice = db.sequelize.import('../api/choice/choice.model');
db.Concept = db.sequelize.import('../api/concept/concept.model');
db.Game = db.sequelize.import('../api/game/game.model');
db.Message = db.sequelize.import('../api/message/message.model');
db.Question = db.sequelize.import("../api/question/question.model")
db.Thing = db.sequelize.import('../api/thing/thing.model');
db.User = db.sequelize.import('../api/user/user.model');

db.Concept.hasMany(db.Question)
db.Question.belongsTo(db.Concept); 

db.Question.hasMany(db.Choice)
db.Choice.belongsTo(db.Question)

db.Game.belongsTo(db.Concept)
db.Concept.hasMany(db.Game)

db.Game.belongsTo(db.User,{ as :"User1bis"}),
db.Game.belongsTo(db.User,{ as :"User2bis"})

//db.Game.belongsTo(db.User,{as : "userdeux"}),
//db.User.hasMany(db.Game,{as : "seconduser"})
//db.Game.belongsTo(db.User, {as: 'user1'});
//db.Game.belongsTo(db.User, {as: 'user2Id'});

//db.User.hasMany(db.Game),

module.exports = db;
