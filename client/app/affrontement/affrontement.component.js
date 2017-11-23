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
  listMessages = [];
  listGames = [];
  userChoisi = [];
  conceptChoisi = [];
  currentUser = [];
  chat_message = '';

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
      socket.unsyncUpdates('message');
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

    this.$http.get('/api/messages')
    .then(response => {
      this.listMessages = response.data;
      this.socket.syncUpdates('message', this.listMessages);
    });

  }

  choix_concept(c) {
    this.clearAll();
    this.conceptChoisi = c;
    this.jChoisi = true;
    //console.log(c);
  }

  choix_user(user) {
    this.clearAll();
    this.userChoisi = user;
    this.jChoisi = true;
    //console.log(this.userChoisi);
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

  addChatElement(){
    document.getElementById('affront_chat').style.visibility='visible';
  }
  
  scrollElement(){
    elem = document.getElementById('affront_chat');
    if((elem.scrolHeight - elem.scrollTop) < 110){
    }
  }

  refreshChats(){
    var string='';
    this.$http.get('/api/messages')
    .then(response => {
      this.listMessages = response.data;
      this.socket.syncUpdates('message', this.listMessages);
    });
    
    for(var mess in this.ListMessages) {
      
        string += '<p>' + mess.expediteur+' : '+mess.message + '</p>';
    } 
    var newEle = angular.element(string);
    var target = document.getElementById('affront-chat');
    angular.element(target).append(newEle);
    
  }  // end refreshChats

  
  /* 
  * msg_type = 1 :  menssage d'utilisateur
  * msg_type = 2 :  invitation a jouer
  * msg_type = 3 :  invitation accepte
  * msg_type = 4 :  invitation refuse
  */
  submitMessage(t = 1) {
    
    var myMessage = '';
    if(t==1)       myMessage = this.chat_message;
    else if(t==2)  myMessage = 'Invitation envoye';
    else if(t==3)  myMessage = 'Invitation accepte';
    else if(t==4)  myMessage = 'Invitation refuse';

    if (myMessage != "" ) {
      
      this.$http.post("/api/messages", {
        expediteur: this.getCurrentUser().email,
        destinataire: this.userChoisi.email,
        msg_type: t,
        message: myMessage
      })
      .then(response => {
        this.idNewMessage = response.data._id;
      });
      //console.log(this.getCurrentUser().email+' '+this.userChoisi.email+' '+this.chat_message+' '+t);
      document.getElementById('input_aff_chat').value='';
      document.getElementById('msgInfo').innerHTML = myMessage;
      setTimeout(function(){
        document.getElementById("msgInfo").innerHTML = "";
      }, 6000);
      myMessage = '';
      this.chat_message = '';
      
    }
    else {
      this.logMessage="on ne peut pas envoyer un message vide"
    }
    

  } // end submit message


  /*********  Submit Game  ************ */
  submitGame() {
       
      this.$http.post("/api/games", {
        user1: this.getCurrentUser()._id,
        user2: this.userChoisi._id,
        concept: this.conceptChoisi.name,
      })
      .then(response => {
        this.idNewMessage = response.data._id;
      });
      //console.log(this.getCurrentUser()._id+' '+this.userChoisi._id+' '+this.conceptChoisi.name);
      
  } // end submit Game


  clearAll(){

    this.chat_message = '';
    this.jChoice = false;
    this.jChoisi = false;
    this.cChoisi = false
    this.jAffront = false;

  }


}   // end class




export default angular.module('skillGameApp.affrontement', [uiRouter])
  .config(routing)
  .component('affrontement', {
    template: require('./affrontement.html'),
    controller: AffrontementController
  })
  .name;
