'use strict';

export default function routes($stateProvider) {
  'ngInject';

  $stateProvider.state('jeu2', {
    url: '/jeu2',
    template: '<jeu2></jeu2>'
  });
}
