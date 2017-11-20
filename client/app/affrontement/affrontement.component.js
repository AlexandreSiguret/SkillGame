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
    });
  } // end constructor

  $onInit() {
    this.$http.get('/api/users/notme')
    .then(response => {
      this.listUsers = response.data;
      this.socket.syncUpdates('user', this.listUsers);
    });

    this.$http.get('/api/messages')
    .then(response => {
      this.listMessages = response.data;
      this.socket.syncUpdates('message', this.listMessages);
    });

  }

  choix_user(user) {
    this.userChoisi = user;
    this.jChoice = false;
    this.jChoisi = true;
    console.log(this.jChoice,this.jChoisi);
  }

  affStatus(a){
    console.log("ingresa parametro: "+a);
    this.jChoice = false;
    this.jeuChoice = false;
    this.jChoisi = false;    
    this.jAffront = false;

    switch(a){
      case 'jChoice':
        this.jChoice = true;
      break;
      case 'jeuChoice':
      this.jeuChoice = true;
      break;
      case 'jChoisi':
        this.jChoisi = true;
        console.log(this.jChoisi);
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

  addChatElement(){
    document.getElementById('affront_chat').style.visibility='visible';
  }
  

  refreshChats(){
    var string='';
    this.$http.get('/api/messages')
    .then(response => {
      this.listMessages = response.data;
      this.socket.syncUpdates('message', this.listMessages);
    });
    
    for(var mess in this.ListMessages) {
      console.log(mess.message);
    string += '<p>' + mess.expediteur+' : '+mess.message + '</p>';
    } 
    console.log(string);
    var newEle = angular.element(string);
    var target = document.getElementById('affront-chat');
    angular.element(target).append(newEle);
    
  }  // end refreshChats

  doSubmit(){
    //console.log(k);
     //if(k == 13){
     // console.log("mensaje enviado");
    // }
     console.log("mensaje enviado");
  }  // end doSubmit
  

  /*
  * msg_type = 1 :  menssage d'utilisateur
  * msg_type = 2 :  invitation a jouer
  * msg_type = 3 :  invitation accepte
  * msg_type = 4 :  invitation refuse
  */
  submitMessage(t = 1) {
    console.log("parametro enviado: "+t);
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
        console.log("message created: "+this.idNewMessage);
      })
      console.log(this.getCurrentUser().email+' '+this.userChoisi.email+' '+this.chat_message+' '+t);
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
