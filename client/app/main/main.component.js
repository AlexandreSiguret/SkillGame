import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';

export class MainController {
  $http;
  socket;

  /*@ngInject*/
  constructor($http, $scope, socket) {
    this.$http = $http;
    this.socket = socket;
    this.classement = {}

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('concept');
    });
  }

  $onInit(){
    this.$http.get('/api/scores')
    .then(response =>{
      this.classement = response.data
      console.log(this.classement)      
    })
  }
 
}



export default angular.module('skillGameApp.main', [uiRouter])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController
  })
  .name;
