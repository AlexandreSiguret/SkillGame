'use strict';
export default function routes($stateProvider) {
  'ngInject';

  $stateProvider.state('question', {
    url: '/question/:game_id',
    template: '<question></question>'
  });
}
