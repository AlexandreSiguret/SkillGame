'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './messenger.routes';

export class MessengerComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('skillGameApp.messenger', [uiRouter])
  .config(routes)
  .component('messenger', {
    template: require('./messenger.html'),
    controller: MessengerComponent,
    controllerAs: 'messengerCtrl'
  })
  .name;
