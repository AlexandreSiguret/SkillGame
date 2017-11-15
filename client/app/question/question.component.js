import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './question.routes';

export class QuestionController {
  $http;
  socket;
  awesomeQuestion = [];
  blabla = "génial";
  newThing = '';

  /*@ngInject*/
  constructor($http, $scope, socket) {
    this.$http = $http;
    this.socket = socket;
    this.fun = "c est marrant ";
    this.all_correct_answers = [4, 4, 4, 4, 4];
    this.all_answers = [];
    this.resultats = 0;

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
    this.i=1;

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('question');
    });
    
  }
  
// modif
$onInit() {
  this.$http.get('/api/questions')
    .then(response => {
      this.awesomeQuestion = response.data;
      console.log(this.controleQuestion)
      console.log(response.data)
    });
}

// modif

    Check_next() {
    if (this.i == 5) {
      var myEl = angular.element(document.querySelector('#next-question-button'));
      myEl.attr('disabled',"");
      var myEl = angular.element(document.querySelector('#prev-question-button'));
      myEl.removeAttr('disabled');
      }

    if (this.i < 5) {
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
    if (this.i == 1) {
      var myEl = angular.element(document.querySelector('#prev-question-button'));
      myEl.attr('disabled',"");
      var myEl = angular.element(document.querySelector('#next-question-button'));
      myEl.removeAttr('disabled');
    }

    if (this.i > 1) {
      var myEl = angular.element(document.querySelector('#prev-question-button'));
      myEl.removeAttr('disabled');
      this.i --;
    }
    else {
      var myEl = angular.element(document.querySelector('#prev-question-button'));
      myEl.attr('disabled',"");
    }
   }

   report(){
    
    console.log(this.awesomeQuestion[0].nbContestation)
    console.log("id id ")
    console.log(this.awesomeQuestion[0]._id)
    
     if (this.awesomeQuestion[0]._id == 1){
       
       var i = this.awesomeQuestion[0].nbContestation+1;
       //console.log("Je suis bon")
       //console.log(i)
      this.$http.put("/api/questions/1", {  
        nbContestation: i
      })

      console.log("après ma condition")
      console.log(i)
     }

   }

  validation(select){
/*    if(!this.valide){
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
  }*/

  for (var i = 1; i < 5; i++) {
      var variable = '#label-choices-'+i;
      var myEl = angular.element( document.querySelector( variable ) );
      myEl.removeAttr('class');
  }

      this.all_answers[this.i] = select.id;
      var variable = '#label-choices-'+this.all_answers[this.i];
      var myEl = angular.element( document.querySelector( variable ) );
      myEl.removeAttr('class');
      myEl.attr('class',"chicked");


      
  }

  submit(){
    
    if ( (this.all_answers[this.i] != 0) && (this.all_answers[this.i] == this.all_correct_answers[this.i]) ) {
      var variable = '#label-choices-'+this.all_answers[this.i];
      var myEl = angular.element( document.querySelector( variable ) );
      myEl.removeAttr('class');
      myEl.attr('class',"true");

      for (var i = 1; i < 5; i++) {
      var variable = '#choices-'+i;
      var myEl = angular.element( document.querySelector( variable ) );
      myEl.attr('disabled',"");
      }

    }
    else if ((this.all_answers[this.i] != 0) && (this.all_answers[this.i] != this.all_correct_answers[this.i])) {

      var variable = '#label-choices-'+this.all_correct_answers[this.i];
      var myEl = angular.element( document.querySelector( variable ) );
      myEl.removeAttr('class');
      myEl.attr('class',"true");

      var variable2 = '#label-choices-'+this.all_answers[this.i];
      var myE2 = angular.element( document.querySelector( variable2 ) );
      myE2.removeAttr('class');
      myE2.attr('class',"false");

      for (var i = 1; i < 5; i++) {
      var variable = '#choices-'+i;
      var myEl = angular.element( document.querySelector( variable ) );
      myEl.attr('disabled',"");
      }

      //alert('____false___'+this.all_answers[this.i])

      
    }


    /*this.resultats = 0;
    for (var i = 0; i < this.all_answers.length; i++) {
      if (this.all_answers[i] == this.all_correct_answers[i]) {
        this.resultats ++;
      }
    }

  var myEl = angular.element(document.querySelector('#quiz-results'));
      myEl.removeAttr('style');
  var myEl = angular.element(document.querySelector('#prev-question-button'));
      myEl.attr('disabled',"");
  var myEl = angular.element(document.querySelector('#next-question-button'));
      myEl.attr('disabled',"");
  var myEl = angular.element(document.querySelector('#submit-button'));
      myEl.attr('disabled',"");*/

  }

  submit_()
  {
    this.resultats = 0;
    for (var i = 0; i < this.all_answers.length; i++) {
      if (this.all_answers[i] == this.all_correct_answers[i]) {
        this.resultats ++;
      }
    }

  var myEl = angular.element(document.querySelector('#quiz-results'));
      myEl.removeAttr('style');
  var myEl = angular.element(document.querySelector('#prev-question-button'));
      myEl.attr('disabled',"");
  var myEl = angular.element(document.querySelector('#next-question-button'));
      myEl.attr('disabled',"");
  var myEl = angular.element(document.querySelector('#submit-button'));
      myEl.attr('disabled',"");

  }

}

export default angular.module('skillGameApp.question', [uiRouter])
  .config(routing)
  .component('question', {
    template: require('./question.html'),
    controller: QuestionController
  })
  .name;
