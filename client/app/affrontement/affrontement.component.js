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
  currentUser = [];
  chat_message = '';
  expediteur = '';
  destinataire = '';

  /*@ngInject*/
  constructor($http, $scope, socket, Auth) {
    this.$http = $http;
    this.socket = socket;
    this.jChoice = true;
    this.jeuChoice = false;
    this.jChoisi = false;
    this.jAffront = false;


    this.getCurrentUser = Auth.getCurrentUserSync;
 
    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('user');
      socket.unsyncUpdates('message');
      socket.unsyncUpdates('game');
    });
  } // end constructor

  $onInit() {
    this.$http.get('/api/users')
    .then(response => {
      this.listUsers = response.data;
      this.socket.syncUpdates('user', this.listUsers);
    });

    this.$http.get('/api/concepts')
    .then(response => {
      this.listConcepts = response.data;
      console.log(response.data)

    });

    this.$http.get('/api/messages')
    .then(response => {
      this.listMessages = response.data;
      this.socket.syncUpdates('message', this.listMessages);
    });

    this.$http.get('/api/games')
    .then(response => {
      this.listGames = response.data;
      this.socket.syncUpdates('game', this.listGames);
    });
  }

  choix_concept(c) {
    this.conceptChoisi = c;

    this.jChoisi = true;
  }

  choix_user(user) {
    this.userChoisi = user;

    this.jChoisi = true;
  }

  affStatus(a){
    this.jChoice = false;
    this.jeuChoice = false;
    this.jChoisi = false;    
    this.jAffront = false;

    switch(a){
      case 'jChoice':
        this.jChoice = true;
      break;
 //     case 'jeuChoice':
 //     this.jeuChoice = true;
 //     break;
      case 'jChoisi':
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
      })
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


}   // end class




export default angular.module('skillGameApp.affrontement', [uiRouter])
  .config(routing)
  .component('affrontement', {
    template: require('./affrontement.html'),
    controller: AffrontementController
  })
  .name;
