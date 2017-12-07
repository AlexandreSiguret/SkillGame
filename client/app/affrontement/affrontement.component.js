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
  constructor($http, $scope, socket, Auth, $location ) { 
    this.$http = $http;
    this.socket = socket;
    this.$location = $location;
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

  againstTime(idconcept){
    if (idconcept == undefined){
      console.log("please choose a concept");
    } 
    else{
      console.log("concept trouvé");
      console.log(idconcept);

      console.log(" redirect");
      
      this.$location.path('/jeuchrono/'+idconcept);
      this.$location.replace();

    }

  }

  lookForAGame(idconcept) {   

  if (idconcept == undefined){
    console.log("please choose a concept")
  }
  else{
        this.$http.get('/api/games/freeGame/'+ idconcept)
        .then(response => {
          this.freeAwesomeGames = response.data;
          if(response.data.length == 0){       
            this.$http.post("/api/games", {          
              ConceptId: idconcept,
              ended : false,
            })
          }
          else{
            console.log(this.freeAwesomeGames)
            this.$http.put("/api/games/" + this.freeAwesomeGames[0]._id, {
             /* user1 : this.freeAwesomeGames[0].user1,
              concept: this.freeAwesomeGames[0].concept,
              ended : this.freeAwesomeGames[0].ended*/
              _id : this.freeAwesomeGames[0]._id
            })
          }
          console.log(this.freeAwesomeGames)
            });
    
        // this.$window.location.href = '/game';
          }
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
  submitGame(userid, conceptid) {
    
    if(conceptid != undefined){
      
      this.$http.post("/api/games", { 
        User2Id: userid,
        ConceptId: conceptid,
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
