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
    this.fun = "c est marrant ";
    this.all_questions = [{
  question: "Question 1 ?",
  choices: [{
        pos :"wrong",
        id : 1},
        {pos :"wrong",
        id : 2},
        {pos :"wrong",
        id : 3},
        {pos : "correct 1",
        id : 4}
    ]
}, {
  question: "Question 2 ?",
  choices: [{
        pos :"wrong",
        id : 1},
        {pos :"wrong",
        id : 2},
        {pos :"wrong",
        id : 3},
        {pos : "correct 2",
        id : 4}
    ]
}, {
  question: "Question 3 ?",
  choices: [{
        pos :"wrong",
        id : 1},
        {pos :"wrong",
        id : 2},
        {pos :"wrong",
        id : 3},
        {pos : "correct 3",
        id : 4}
    ]
}, {
  question: "Question 4 ?",
  choices: [{
        pos :"wrong",
        id : 1},
        {pos :"wrong",
        id : 2},
        {pos :"wrong",
        id : 3},
        {pos : "correct 4",
        id : 4}
    ]
},  {
  question: "Question 5 ?",
  choices: [{
        pos :"wrong",
        id : 1},
        {pos :"wrong",
        id : 2},
        {pos :"wrong",
        id : 3},
        {pos : "correct 5",
        id : 4}
    ]
}];


    this.valide = false;
    this.correct_answer = "";
    this.message = "";
    this.i=0;

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('thing');
    });
    
  }

    Check_next() {
    if (this.i == 4) {
      var myEl = angular.element(document.querySelector('#next-question-button'));
      myEl.attr('disabled',"");
      var myEl = angular.element(document.querySelector('#prev-question-button'));
      myEl.removeAttr('disabled');
      }

    if (this.i < 4) {
      var myEl = angular.element(document.querySelector('#next-question-button'));
      myEl.removeAttr('disabled');
      this.i ++;
    }
    else {
      var myEl = angular.element(document.querySelector('#next-question-button'));
      myEl.attr('disabled',"");
    }
   }

   Check_prev() {
    if (this.i == 0) {
      var myEl = angular.element(document.querySelector('#prev-question-button'));
      myEl.attr('disabled',"");
      var myEl = angular.element(document.querySelector('#next-question-button'));
      myEl.removeAttr('disabled');
    }

    if (this.i > 0) {
      var myEl = angular.element(document.querySelector('#prev-question-button'));
      myEl.removeAttr('disabled');
      this.i --;
    }
    else {
      var myEl = angular.element(document.querySelector('#prev-question-button'));
      myEl.attr('disabled',"");
    }
   }

  validation(select){
    if(!this.valide){
    this.valide = true;
    this.correct_answer = {pos :"correct",id : 1}
    if(this.correct_answer.id ==select.id){
        this.message = "Correct !"
    }
    else{
        
        this.message = "Nop " + this.correct_answer.pos
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
