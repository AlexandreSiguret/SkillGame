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
  listGames = [];
  userChoisi = [];
  conceptChoisi = [];
  currentUser = []; 

  /*@ngInject*/
  constructor($http, $scope, socket, Auth) {
    this.$http = $http;
    this.socket = socket;
    this.jChoice = true;
    this.jChoisi = false;
    this.cChoisi = false;


    this.getCurrentUser = Auth.getCurrentUserSync;
 
    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('user');
      socket.unsyncUpdates('concept');
    });
  } // end constructor

  $onInit() {
    this.$http.get('/api/users/notme')
    .then(response => {
      this.listUsers = response.data;
      this.socket.syncUpdates('user', this.listUsers);
    });

    this.$http.get('/api/concepts')
    .then(response => {
      this.listConcepts = response.data;
      this.socket.syncUpdates('concept', this.listConcepts);
    });

  }

  choix_concept(c, u) {
    this.clearAll();
    this.conceptChoisi = c;
    this.userChoisi = u;
    this.cChoisi = true;
    this.jChoisi = true;
  }

  affStatus(a){
    this.clearAll();
    switch(a){
      case 'jChoice':     this.jChoice = true; break;
      case 'jChoisi':     this.jChoisi = true; break;
    }; 
  } 


  /*********  Submit Game  ************ */
  submitGame(u) {
    
    if(this.userChoisi._id == u._id){
      
      this.$http.post("/api/games", { 
        User2Id: this.userChoisi._id,
        ConceptId: this.conceptChoisi._id,
      })
      .then(response => {
        this.idNewMessage = response.data._id;
      });
      
      console.log('Currentuser: '+this.getCurrentUser().name+', User Choisi: '+this.userChoisi.name+', ConceptChoisi: '+this.conceptChoisi.name);
    }else{
      console.log("Select a concept please!");
    } 
      
  } // end submit Game

  clearAll(){

    this.chat_message = '';
    this.jChoice = false;
    this.jChoisi = false;
    this.cChoisi = false
    this.jAffront = false;

  }


} 




export default angular.module('skillGameApp.affrontement', [uiRouter])
  .config(routing)
  .component('affrontement', {
    template: require('./affrontement.html'),
    controller: AffrontementController
  })
  .name;
