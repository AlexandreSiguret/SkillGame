import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './classement.routes';

export class ClassementController {
  $http;
  socket; 
  
  threeAwesomePlayers;

  /*@ngInject*/
  constructor($http, $scope, socket, Auth) {
    this.$http = $http;
    this.socket = socket;
    this.cChoisi = false;    
 
    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('user');
      socket.unsyncUpdates('concept');
      socket.unsyncUpdates('score');
    });
  } 

  $onInit() {    

    this.$http.get('/api/concepts')
    .then(response => {
      this.listConcepts = response.data;
      this.socket.syncUpdates('concept', this.listConcepts);
    });
     

  }

  choix_concept(c) {
    
    this.conceptChoisi = c;
    this.jChoisi = true;    
    this.cChoisi = true;
    console.log(c);
    this.$http.get("/api/scores/topthree/"+c._id)
    .then(response =>{
      this.threeAwesomePlayers = response.data;
      console.log(this.threeAwesomePlayers)
    })
    
  }  

}   


export default angular.module('skillGameApp.classement', [uiRouter])
  .config(routing)
  .component('classement', {
    template: require('./classement.html'),
    controller: ClassementController
  })
  .name;
