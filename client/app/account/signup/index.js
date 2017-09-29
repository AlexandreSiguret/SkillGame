'use strict';

import angular from 'angular';
import SignupController from './signup.controller';

export default angular.module('skillGameApp.signup', [])
  .controller('SignupController', SignupController)
  .name;
