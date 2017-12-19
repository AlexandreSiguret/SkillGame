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

db.Alonescore = db.sequelize.import('../api/alonescore/alonescore.model');

db.Award = db.sequelize.import('../api/award/award.model');

db.Badge = db.sequelize.import('../api/badge/badge.model');
db.Answer = db.sequelize.import('../api/answer/answer.model');
db.Choice = db.sequelize.import('../api/choice/choice.model');
db.Concept = db.sequelize.import('../api/concept/concept.model');
db.Game = db.sequelize.import('../api/game/game.model');
db.Score = db.sequelize.import('../api/score/score.model');
db.Message = db.sequelize.import('../api/message/message.model');
db.Question = db.sequelize.import('../api/question/question.model');
db.Thing = db.sequelize.import('../api/thing/thing.model');
db.User = db.sequelize.import('../api/user/user.model');

//db.Award.belongsTo(db.Concept);
//db.Concept.hasMany(db.Award);
db.Award.belongsTo(db.User);
db.User.hasMany(db.Award);
db.Award.belongsTo(db.Badge);
db.Badge.hasMany(db.Award);

db.Concept.hasMany(db.Question);
db.Question.belongsTo(db.Concept); 

db.Question.hasMany(db.Choice);
db.Choice.belongsTo(db.Question);

db.Game.belongsTo(db.Concept);
db.Concept.hasMany(db.Game);

db.Game.belongsTo(db.User,{ as :"User1"}),
db.Game.belongsTo(db.User,{ as :"User2"})

db.Score.belongsTo(db.Concept);
db.Concept.hasMany(db.Score);

db.Alonescore.belongsTo(db.Concept);
db.Concept.hasMany(db.Alonescore);

db.Score.belongsTo(db.User);
db.User.hasMany(db.Score);

db.Alonescore.belongsTo(db.User);
db.User.hasMany(db.Alonescore);

db.Answer.belongsTo(db.User);
db.Answer.belongsTo(db.Game);
db.Answer.belongsTo(db.Question);
db.Answer.belongsTo(db.Choice);


//db.Game.belongsTo(db.User,{as : "userdeux"}),
//db.User.hasMany(db.Game,{as : "seconduser"})
//db.Game.belongsTo(db.User, {as: 'user1'});
//db.Game.belongsTo(db.User, {as: 'user2Id'});

//db.User.hasMany(db.Game),

module.exports = db;
