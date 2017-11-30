'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './game.routes';

export class GameComponent {
  /*@ngInject*/
  constructor($http, $scope, socket, $window) {
    this.$http = $http;
    this.$window = $window;
    this.socket = socket;
    this.finishGame = []
    this.openGame = []
    this.message = 'Hello';
    this.listUsers = [];
    this.listConcepts = [];

  }
  $onInit(){

    this.$http.get("/api/games/mygame")
    .then(response =>{
      this.myAwesomeGame = response.data
      for(var i = 0; i < this.myAwesomeGame.length ; i++){
        if(this.myAwesomeGame[i].ended ==true){
          this.finishGame.push(this.myAwesomeGame[i])
        }
        else{
          this.openGame.push(this.myAwesomeGame[i])
        }
      }
      console.log(this.finishGame);
      console.log("mes parties non finie mtn");
      console.log(this.openGame);

      for (var i = 0; i < this.openGame.length; i++) {

        if (this.openGame[i].User1 == null) {
            this.openGame[i].User2 = [];
            this.openGame[i].User1.name = "Unknown";
            this.openGame[i].User1.avatar = 'inconnu.png' //src=""
          }

        if(this.openGame[i].User2 == null) {
          this.openGame[i].User2 = [];
          this.openGame[i].User2.name = "Unknown";
          this.openGame[i].User2.avatar = 'inconnu.png' //src=""
        }

      }

    })
  }

  playAGame(player) {
    
/*    console.log("Hellooo Player");
    console.log(player.Concept._id);
    console.log(player._id);
*/
    this.$window.location.href = '/question/'+player._id;

  }


}


export default angular.module('skillGameApp.game', [uiRouter])
  .config(routes)
  .component('game', {
    template: require('./game.html'),
    controller: GameComponent,
    controllerAs: 'gameCtrl'
  })
  .name;
