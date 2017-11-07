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
db.Game = db.sequelize.import('../api/game/game.model');
db.Choice = db.sequelize.import('../api/choice/choice.model');
db.Concept = db.sequelize.import('../api/concept/concept.model');
db.Thing = db.sequelize.import('../api/thing/thing.model');
db.User = db.sequelize.import('../api/user/user.model');
db.Question = db.Question.import("../api/question/question.model")

module.exports = db;
