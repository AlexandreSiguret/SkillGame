'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('messenger', {
      url: '/messenger',
      template: '<messenger></messenger>'
    });
}
