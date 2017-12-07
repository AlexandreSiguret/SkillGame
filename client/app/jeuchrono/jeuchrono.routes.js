'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('jeuchrono', {
      url: '/jeuchrono/:ConceptId', 
      template: '<jeuchrono></jeuchrono>'
    });
}
