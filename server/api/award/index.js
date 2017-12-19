'use strict';

import * as auth from '../../auth/auth.service';

var express = require('express');
var controller = require('./award.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/user/',auth.isAuthenticated(),controller.userAwards);
router.get('/user/badge/:bId',auth.isAuthenticated(),controller.awards);
router.get('/:id', controller.show);
router.post('/create/', auth.isAuthenticated(), controller.create);
router.put('/:id', auth.isAuthenticated(), controller.upsert);
router.delete('/:id', controller.destroy);

module.exports = router;
