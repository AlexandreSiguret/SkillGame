import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './affrontement.routes';

export class AffrontementController {
  $http;
  socket;
 
  getCurrentUser: Function;
  userChoiced = Function;
  affrontStatus = Function;
  listUsers = [];
  userChoisi = [];
  currentUser = []

  /*@ngInject*/
  constructor($http, $scope, socket, Auth) {
    this.$http = $http;
    this.socket = socket;
    this.jChoice = true;
    this.jChoisi = false;
    this.jAffront = false;


    this.getCurrentUser = Auth.getCurrentUserSync;
 
    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('user');
    });
  } // end constructor

  $onInit() {
    this.$http.get('/api/users')
    .then(response => {
      this.listUsers = response.data;
      this.socket.syncUpdates('user', this.listUsers);
    });
  }

  choix_user(user) {
    this.userChoisi = user;
    this.jChoice = false;
    this.jChoisi = true;
    console.log(this.jChoice,this.jChoisi);
  }

  affStatus(a){
    console.log(a);
    this.jChoice = false;
    this.jChoisi = false;    
    this.jAffront = false;

    switch(a){
      case 'jChoice':
        this.jChoice = true;
      break;
      case 'Choisi':
        this.jChoisi = true;
      break;
      case 'invitAccepte':
        this.jAffront = true;
      break;
      case 'invitEnvoye':
        this.jChoisi = true;
      break;
      case 'message':
        this.jChoisi = true;
      break;
      case 'ferme':
        this.jChoice = true;
      break;

    }; //end switch

  }

}


export default angular.module('skillGameApp.affrontement', [uiRouter])
  .config(routing)
  .component('affrontement', {
    template: require('./affrontement.html'),
    controller: AffrontementController
  })
  .name;
