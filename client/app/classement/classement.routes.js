'use strict';

export default function routes($stateProvider) {
  'ngInject';

  $stateProvider.state('classement', {
    url: '/classement',
    template: '<classement></classement>'
  });
}
