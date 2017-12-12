'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('badges', {
      url: '/badges',
      template: '<badges></badges>'
    });
}
