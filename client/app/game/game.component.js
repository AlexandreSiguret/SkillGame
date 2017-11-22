'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './game.routes';

export class GameComponent {
  /*@ngInject*/
  constructor($http, $scope, socket) {
    this.$http = $http;
    this.socket = socket;
    this.finishGame = []
    this.openGame = []
    this.message = 'Hello';
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
      console.log(this.finishGame)
      console.log("mes parties non finie mtn")
      console.log(this.openGame)
    }

  )
  
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
