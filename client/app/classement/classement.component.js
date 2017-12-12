import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './classement.routes';

export class ClassementController {
  $http;
  socket; 
  listPlayers;
  threeAwesomePlayers;
  threeAwesomeAlonePlayers;
  listAwards;

  /*@ngInject*/
  constructor($http, $scope, socket, Auth) {
    this.$http = $http;
    this.socket = socket;
    this.cChoisi = true;
    this.showme = true;
    this.showus = true;
    this.listPlayers = [];
    this.listAwards = [];    
 
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
    this.$http.get("/api/users/ranked  ")
    .then(response =>{
      this.listPlayersRanked = response.data;
      console.log(this.listPlayersRanked)
    });
    this.$http.get("/api/users")
    .then(response =>{
      this.listPlayers = response.data;
      console.log(this.listPlayers)
    });
    this.$http.get("/api/badges")
    .then(response =>{
      this.listBadges = response.data;
      console.log(this.listBadges)
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
    });

    this.$http.get("/api/alonescores/three/"+c._id)
    .then(response =>{
      this.threeAwesomeAlonePlayers = response.data;
      console.log(this.threeAwesomeAlonePlayers) 
    });
  } 

  getAwards(usr,cpt,bdg) {
  //  if(typeof usr !== 'undefined') usr._id = 0;
    console.log(usr._id+'/'+cpt._id+'/'+bdg._id);
    this.$http.get('/api/awards/'+usr._id+'/'+cpt._id+'/'+bdg._id)
    .then(response =>{
      this.listAwards = response.data;
      console.log(this.listAwards)
    });
  }

  showButtonHandler() {

    if(this.showme == true) {
      this.showme = false;
    } else {
      this.showme = true;
    }

    if(this.showus == true) {     
      this.showus = false;
    } else {
      this.showus = true;
    }
    
  }

}   


export default angular.module('skillGameApp.classement', [uiRouter])
  .config(routing)
  .component('classement', {
    template: require('./classement.html'),
    controller: ClassementController
  })
  .name;
