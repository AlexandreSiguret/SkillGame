'use strict';

export default function routes($stateProvider) {
  'ngInject';

  $stateProvider.state('affrontement', {
    url: '/affrontement',
    template: '<affrontement></affrontement>'
  });
}
