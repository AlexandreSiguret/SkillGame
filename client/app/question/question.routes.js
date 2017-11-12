'use strict';
export default function routes($stateProvider) {
  'ngInject';

  $stateProvider.state('question', {
    url: '/question/:concept_id',
    template: '<question></question>'
  });
}
