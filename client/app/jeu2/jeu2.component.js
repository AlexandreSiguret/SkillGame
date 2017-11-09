import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './jeu2.routes';

export class Jeu2Controller {
  $http;
  socket;
  awesomeThings = [];
  blabla = "Jeu !"
  newThing = '';

  /*@ngInject*/
  constructor($http, $scope, socket) {
    this.$http = $http;
    this.socket = socket;
    this.fun = " ";
    this.valide = false;
    this.correct_answer = "";
    this.message = "";

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('thing');
    });
    
  }  // fin constructor

}


export default angular.module('skillGameApp.jeu2', [uiRouter])
  .config(routing)
  .component('jeu2', {
    template: require('./jeu2.html'),
    controller: Jeu2Controller
  })
  .name;

