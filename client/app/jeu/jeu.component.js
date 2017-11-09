import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './jeu.routes';

export class JeuController {
  $http;
  socket;
  awesomeThings = [];
  blabla = "Jeu !"
  newThing = '';

  /*@ngInject*/
  constructor($http, $scope, socket) {
    this.$http = $http;
    this.socket = socket;
    this.fun = " ";
    this.valide = false;
    this.correct_answer = "";
    this.message = "";

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('thing');
    });
    
  }  // fin constructor

 /* 
  jeju(){
    var app = angular.module('ticTacToe', []);
    app.controller('GameController', function(){
        this.game = new TicTacToe();
        this.game.activePlayer = this.game.players[0];
        this.newGame = function(){
            this.game = new TicTacToe();
            this.game.activePlayer = this.game.players[0];
        }
    });

    var TicTacToe = function(){
        this.title = "Tic Tac Toe";
        this.activePlayer = null;
        this.winner = null;
        this.draw = true;
        this.movements = null;
        this.players=[
            {name: "Player 1", symbol:"X", movements : []},
            {name: "Player 2", symbol:"O", movements : []}
        ];
        this.solutions = [
            [1,2,3],   [4,5,6],   [7,8,9], // Horizontals
            [1,4,7],   [2,5,8],   [3,6,9], // Verticals
            [1,5,9],   [7,5,3]    // Diagonals
        ];
        this.board ={
            rows:[
                [
                    {id: 1, value: "", isChecked:false},
                    {id: 2, value: "", isChecked:false},
                    {id: 3, value: "", isChecked:false}
                ],
                [
                    {id: 4, value: "", isChecked:false},
                    {id: 5, value: "", isChecked:false},
                    {id: 6, value: "", isChecked:false}
                ],
                [
                    {id: 7, value: "", isChecked:false },
                    {id: 8, value: "", isChecked:false},
                    {id: 9, value: "", isChecked:false}
                ]
            ]
        };
        this.fillBox = function(id){
            for(var i = 0; i < this.board.rows.length; i++){
                for(var k = 0; k < this.board.rows[i].length; k++){
                    if(this.board.rows[i][k].id == id){
                        if(this.activePlayer == null){
                            this.activePlayer = this.players[0];
                        }else{
                            if(this.activePlayer.name == this.players[0].name){
                                this.players[0].movements.push(id);
                                this.verifyGame(this.players[0]);
                                this.activePlayer = this.players[1];
                            }else{
                                this.players[1].movements.push(id);
                                this.verifyGame(this.players[1]);
                                this.activePlayer = this.players[0];
                            }
                        }
                        this.board.rows[i][k].value = this.activePlayer.symbol;
                        this.board.rows[i][k].isChecked = true;
                    }
                }
            }
        };
        this.verifyGame =function(player){
            var totalMovements = (this.players[0].movements.length + this.players[1].movements.length);
            if(totalMovements == this.board.rows.length * this.board.rows[0].length){
                this.draw = false;
            }else{
                for(var i = 0; i < this.solutions.length; i++){
                    var isSolution = true;
                    for(var k = 0; k < this.solutions[i].length; k++){
                        isSolution &= (player.movements.indexOf(this.solutions[i][k]) != -1);
                    }
                    if(isSolution){
                        this.winner = player.name;
                        this.movements = player.movements.length;
                        this.highLightSolution(this.solutions[i]);
                    }
                }
            }
        };
        this.highLightSolution = function(solution){
            for(var i = 0; i < solution.length; i++){
                var button = $("button")[solution[i] - 1];
                $(button).addClass("solution-check");
            }
        }
    };
};
*/
}


export default angular.module('skillGameApp.jeu', [uiRouter])
  .config(routing)
  .component('jeu', {
    template: require('./jeu.html'),
    controller: JeuController
  })
  .name;

