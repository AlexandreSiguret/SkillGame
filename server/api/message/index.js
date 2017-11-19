'use strict';
import * as auth from '../../auth/auth.service';

var express = require('express');
var controller = require('./message.controller');

var router = express.Router();

router.get('/', controller.index);
router.get("/mymessage",auth.isAuthenticated(),controller.message);
router.get('/:id', controller.show);
router.post('/', auth.isAuthenticated(), controller.create);
router.delete('/:id', controller.destroy);

module.exports = router;
