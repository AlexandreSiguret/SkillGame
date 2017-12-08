import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './affrontement.routes';

export class AffrontementController {
  $http;
  socket;
  getCurrentUser: Function;
  listUsers = [];
  listGames = [];
  
  /*@ngInject*/

  constructor($http, $scope, socket, Auth, $location ) { 


    this.$http = $http;
    this.$window = $window;
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
  }

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


  /*********  Submit Game  ************ */
  submitGame(userid, conceptid) {
    
    if(conceptid != undefined){
      
      this.$http.post("/api/games", { 
        User2Id: userid,
        ConceptId: conceptid,
      })
      .then(response => {
        this.idNewMessage = response.data._id; 
        this.$window.location.href = '/question/'+ response.data._id;
      });
      
    }else{
      console.log("Select a concept please!");
    } 
      
  } // end submit Game

} 


export default angular.module('skillGameApp.affrontement', [uiRouter])
  .config(routing)
  .component('affrontement', {
    template: require('./affrontement.html'),
    controller: AffrontementController
  })
  .name;
