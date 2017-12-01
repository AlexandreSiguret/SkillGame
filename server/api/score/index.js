'use strict';

import * as auth from '../../auth/auth.service';

var express = require('express');
var controller = require('./score.controller');

var router = express.Router();

router.get('/', auth.isAuthenticated(),controller.index);
router.get('/topthree/:id' ,auth.isAuthenticated(),controller.topthree);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/',auth.isAuthenticated(), controller.create);
router.put('/:id',auth.isAuthenticated(), controller.upsert);
router.patch('/:id',auth.isAuthenticated(), controller.patch);
router.delete('/:id',auth.isAuthenticated(), controller.destroy);

module.exports = router;
