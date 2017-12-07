'use strict';

export default function routes($stateProvider) {
  'ngInject';

  $stateProvider.state('questions', {
    url: '/questions/:id',
    template: '<questions></questions>'
  });
}
