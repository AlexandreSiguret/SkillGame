'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './messenger.routes';

export class MessengerComponent {
  getCurrentUser: Function;
  listUsers = [];
  listMessages = [];
  userChoisi = [];
  currentUser = [];
  chat_message = '';
  jChoisi = false;
  
  /*@ngInject*/
  constructor($http, $scope, socket, Auth) {
    this.$http = $http;
    this.socket = socket;
    this.getCurrentUser = Auth.getCurrentUserSync;
    this.message = 'Hello';

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('user');
      socket.unsyncUpdates('message');
    });

  }

  $onInit() {
    this.$http.get('/api/users/notme')
    .then(response => {
      this.listUsers = response.data;
      this.socket.syncUpdates('user', this.listUsers);
    });

  }

  choix_user(user) {
    this.userChoisi = user;
    this.getUserMessages(this.userChoisi._id);
    this.jChoisi = true;
  }

  getUserMessages(_id){
    this.$http.get('/api/messages/mymessages/'+this.getCurrentUser().email+'/'+this.userChoisi.email)
    .then(response => {
      this.listMessages = response.data;
      this.socket.syncUpdates('message', this.listMessages);
    });
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
    
  }

  /* 
  * msg_type = 1 :  message d'utilisateur
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
        date: new Date(),
        msg_type: t,
        message: myMessage
      })
      .then(response => {
        this.idNewMessage = response.data._id;
      });
      
      console.log(this.getCurrentUser().email+' '+this.userChoisi.email+' '+this.chat_message);
      document.getElementById('input_chat').value='';
      this.chat_message = '';
      
    }
    else {
      console.log("on ne peut pas envoyer un message vide");
    }
    
  }


}

export default angular.module('skillGameApp.messenger', [uiRouter])
  .config(routes)
  .component('messenger', {
    template: require('./messenger.html'),
    controller: MessengerComponent,
    controllerAs: 'messengerCtrl'
  })
  .name;
