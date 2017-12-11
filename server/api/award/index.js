'use strict';

import * as auth from '../../auth/auth.service';

var express = require('express');
var controller = require('./award.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:uId/:cId/:bId',auth.isAuthenticated(),controller.awards);
router.get('/by/:id', controller.show);
router.post('/', auth.isAuthenticated(), controller.create);
router.delete('/:id', controller.destroy);

module.exports = router;
