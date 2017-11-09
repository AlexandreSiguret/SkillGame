import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './question.routes';

export class QuestionController {
  $http;
  socket;
  awesomeThings = [];
  blabla = "génial";
  newThing = '';

  /*@ngInject*/
  constructor($http, $scope, socket) {
    this.$http = $http;
    this.socket = socket;
    this.fun = "c est marrant "
    this.question ="quelle est la couleur du cheval blanc d'henri 4 ? ";
    this.proposition = [{
        pos :"bleu",
        id : 1},
        {pos :"rouge",
        id : 2},
        {pos :"vert",
        id : 3},
        {pos : "blanc",
        id : 4}
    ]
    this.valide = false;
    this.correct_answer = ""
    this.message = ""

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('thing');
    });
    
  }
  
  validation(select){
    if(!this.valide){
    this.valide = true;
    this.correct_answer = {pos :"blanc",id : 4}
    if(this.correct_answer.id ==select.id){
        this.message = "vous avez trouve la bonne réponse "
    }
    else{
        
        this.message = "vous vous êtes trompée la réponse était " + this.correct_answer.pos
    }
  }
  else{
      alert("tu as déja répondu à cette question")
  }
  }
}

export default angular.module('skillGameApp.question', [uiRouter])
  .config(routing)
  .component('question', {
    template: require('./question.html'),
    controller: QuestionController
  })
  .name;
