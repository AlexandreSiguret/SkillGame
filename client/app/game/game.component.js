'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './game.routes';

export class GameComponent {
  /*@ngInject*/


  
  constructor($http, $scope, socket, $window, Auth) {
    this.Auth = Auth;
    this.$http = $http;
    this.$window = $window;
    this.socket = socket;
    this.finishGame = []
    this.openGame = []
    this.waitGame = []
    this.message = 'Hello';
    this.listUsers = [];
    this.listConcepts = [];
    this.id_finish = []
    
 

  }
  $onInit(){

    this.$http.get("/api/games/mygame")
    .then(response =>{
     
      this.myAwesomeGame = response.data
      if(this.myAwesomeGame.length >0){
        console.log("tu as une partie")
        var roh = this.myAwesomeGame[0]["me"]
        console.log(roh)
      for(var i = 0; i < this.myAwesomeGame.length ; i++){
        console.log("ici")
        console.log(roh)


        if(this.myAwesomeGame[i].user1Ended ==true && this.myAwesomeGame[i].user2Ended == true){
          this.finishGame.push(this.myAwesomeGame[i])
          this.id_finish.push(this.myAwesomeGame[i]._id)
        }
       /* else if (this.myAwesomeGame[i]["user1Ended"] == false && this.myAwesomeGame[i]["user2Ended"]== false){ 
          console.log("personne a jouer")
          this.openGame.push(this.myAwesomeGame[i])
        }*/
        else if (this.myAwesomeGame[i]["user1Ended"] == false && this.myAwesomeGame[i]["User1Id"]== this.myAwesomeGame[0]["me"]){
          console.log("condition 2 ")
          this.openGame.push(this.myAwesomeGame[i])
        }
        else if (this.myAwesomeGame[i]["user2Ended"] == false && this.myAwesomeGame[i]["User2Id"]== this.myAwesomeGame[0]["me"]){
          console.log("condition 3 ")
          this.openGame.push(this.myAwesomeGame[i])
        }
        else{
          this.waitGame.push(this.myAwesomeGame[i])
        }

        console.log(this.myAwesomeGame[i]["user2Ended"])
        console.log(this.myAwesomeGame[i])
        console.log("et la")
        console.log(this.myAwesomeGame[0]["me"])
      }
      var string = JSON.stringify(this.id_finish)

      this.$http.get("api/answers/score/" + string)
      .then( res =>{
        console.log(res.data)
      })
      console.log(this.openGame);
      console.log(this.waitGame);
      console.log(this.finishGame);
      console.log(string)
 /*
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

      }*/

    }
    else{
      console.log("tu n as pas de partie abruti")
    }
  })
  }

  playAGame(player) {
    
/*    console.log("Hellooo Player");
    console.log(player.Concept._id);
    console.log(player._id);
*/
    
    this.$window.location.href = '/question/'+player._id; 

    //console.log(player._id);

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
