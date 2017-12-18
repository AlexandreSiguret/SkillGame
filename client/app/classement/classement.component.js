import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './classement.routes';

export class ClassementController {
  $http;
  socket; 
  threeAwesomePlayers;
  threeAwesomeAlonePlayers;

  /*@ngInject*/
  constructor($http, $scope, socket, Auth) {
    this.$http = $http;
    this.cChoisi = true;
    this.showme = true;
    this.showus = true;
  } 

  $onInit() {    

    this.$http.get('/api/concepts')
    .then(response => {
      this.listConcepts = response.data;
    });

  }

  choix_concept(c) {
    
    this.conceptChoisi = c;
  //  this.jChoisi = true;    
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
