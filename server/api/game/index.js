'use strict';
import * as auth from '../../auth/auth.service';

var express = require('express');
var controller = require('./game.controller');

var router = express.Router();

router.get('/', controller.index);
router.get("/mygame",auth.isAuthenticated(),controller.game);
router.get('/endgame/:id', auth.isAuthenticated(), controller.endgame);
router.get('/freeGame/:id',auth.isAuthenticated(),controller.freeGame);
router.get('/:id', controller.show);
router.post('/', auth.isAuthenticated(), controller.create);

router.put('/:id', auth.isAuthenticated(), controller.upsert);
router.patch('/:id', controller.patch);
router.delete('/:id', controller.destroy);

module.exports = router;
