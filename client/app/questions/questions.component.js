import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './questions.routes';

export class QuestionsController {
  $http;
  socket;
  awesomeThings = [];
  newThing = '';
  newConcept = '';
  /*@ngInject*/
  constructor($http, $scope, socket) {
    this.$http = $http;
    this.socket = socket;

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('concept');
    });
  }

  $onInit() {
    this.$http.get('/api/concepts')
      .then(response => {
        this.awesomeThings = response.data;
        this.socket.syncUpdates('concept', this.awesomeThings);
      });
  }

  onClick(id) {
    this.$http.get('/api/concepts')
    alert(id)
      .then(response => {
        this.awesomeThings = response.data;
        this.socket.syncUpdates('concept', this.awesomeThings);
      });
  }


}
  

export default angular.module('skillGameApp.questions', [uiRouter])
  .config(routing)
  .component('questions', {
    template: require('./questions.html'),
    controller: QuestionsController
  })
  .name;
