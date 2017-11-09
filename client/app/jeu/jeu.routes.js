'use strict';

export default function routes($stateProvider) {
  'ngInject';

  $stateProvider.state('jeu', {
    url: '/jeu',
    template: '<jeu></jeu>'
  });
}
