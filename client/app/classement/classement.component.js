import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './classement.routes';

export class ClassementController {
  $http;
  socket;
 
  getCurrentUser: Function;
  userChoiced = Function;
  affrontStatus = Function;
  listUsers = [];
  listUsersScore = [];
  listGames = [];
  userChoisi = [];
  conceptChoisi = [];
  currentUser = [];
  
  staticUsersScore = [
    { _id: 3, name: "Alexandre", avatar: "alexandre.jpg", score: 35},
    { _id: 6, name: "Yassine", avatar: "yassine.jpg", score: 29 },
    { _id: 7, name: "HTSA", avatar: "htsa.jpg", score: 27 }
  ];


  /*@ngInject*/
  constructor($http, $scope, socket, Auth) {
    this.$http = $http;
    this.socket = socket;
    this.jChoice = true;
    this.jChoisi = false;
    this.jAffront = false;
    this.cChoisi = false;
    this.getCurrentUser = Auth.getCurrentUserSync;
 
    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('user');
      //socket.unsyncUpdates('message');
      socket.unsyncUpdates('concept');
      socket.unsyncUpdates('score');
    });
  } // end constructor

  $onInit() {
    this.$http.get('/api/users/notme')
    .then(response => {
      this.listUsers = response.data;
      this.socket.syncUpdates('user', this.listUsers);
      console.log(this.listUsers);
    });

    this.$http.get('/api/concepts')
    .then(response => {
      this.listConcepts = response.data;
      this.socket.syncUpdates('concept', this.listConcepts);
    });
     

  }

  /* *
   * *
   * *  Get Scores of user concepts  **
   * *
   * */
  getUserScore(c) {
    this.conceptChoisi = c;
   // this.$http.get("/api/score/"+this.conceptChoisi._id)
   // .then(response => {
    //  this.userScore = response.data;
      this.listUsersScore = this.staticUsersScore;
    // });
    //console.log(this.userScore.name);
          
  } // end getUserScore


  choix_concept(c) {
    this.clearAll();
    this.conceptChoisi = c;
    this.jChoisi = true;
    this.getUserScore(c);
    console.log(c);
  }

  choix_user(user) {
    this.clearAll();
    this.userChoisi = user;
    this.jChoisi = true;
    console.log(this.userChoisi);
  }

  affStatus(a){
    this.clearAll();
    switch(a){
      case 'jChoice':     this.jChoice = true; break;
      case 'jChoisi':     this.jChoisi = true; break;
      case 'invitAccepte':this.jAffront= true; break;
      case 'invitEnvoye': this.jChoisi = true; break;
      case 'ferme':       this.jChoice = true; break;

    }; //end switch

  }  //end affStatus


  clearAll(){
    this.chat_message = '';
    this.jChoice = false;
    this.jChoisi = false;
    this.cChoisi = false
    this.jAffront = false;
  }


}   // end class




export default angular.module('skillGameApp.classement', [uiRouter])
  .config(routing)
  .component('classement', {
    template: require('./classement.html'),
    controller: ClassementController
  })
  .name;
