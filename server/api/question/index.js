'use strict';

var express = require('express');
var controller = require('./question.controller');
import * as auth from '../../auth/auth.service';

var router = express.Router();

router.get('/', controller.index);
router.get("/myquestion", auth.isAuthenticated(),controller.myquestion);
router.get('/aleatoire/:id',controller.concept);
router.get('/:id', controller.show);
router.post('/',auth.isAuthenticated(), controller.create);
router.put('/:id', controller.upsert);
router.patch('/:id', controller.patch);
router.delete('/:id', controller.destroy);

module.exports = router;
