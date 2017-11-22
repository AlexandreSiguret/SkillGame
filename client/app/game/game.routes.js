'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('game', {
      url: '/game',
      template: '<game></game>'
    });
}
