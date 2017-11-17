'use strict';
export default function routes($stateProvider) {
  'ngInject';

  $stateProvider.state('listquestion', {
    url: '/myquestion',
    template: '<listquestion></listquestion>'
  });
}
