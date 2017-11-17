import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './question.routes';

export class QuestionController {
  $timeout;
  $http;
  socket;
  awesomeQuestion = [];
  blabla = "génial";
  newThing = '';
  

  
  /*@ngInject*/
  constructor($http, $scope, socket, $timeout) {
    this.$http = $http;
    this.socket = socket;
    this.fun = "c est marrant ";
    this.all_correct_answers = [4, 4, 4, 4, 4];
    this.all_answers = [];
    this.answered = [0,0,0,0,0];
    this.resultats = 0;
    this.num = 0;


    $scope.counter = 100;

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


    new_next(){
      if (this.num < this.awesomeQuestion[this.num]._id){
        this.num++;
      }else{
        this.num = 0;
      }

    }

    Check_next() {

    if (this.i == 3) {
      var myEl = angular.element(document.querySelector('#next-question-button'));
      myEl.attr('disabled',"");
      var myEl = angular.element(document.querySelector('#prev-question-button'));
      myEl.removeAttr('disabled');
      this.i ++;
      }

    if (this.i < 3) {
      var myEl = angular.element(document.querySelector('#next-question-button'));
      myEl.removeAttr('disabled');

      var myEl = angular.element(document.querySelector('#prev-question-button'));
      myEl.removeAttr('disabled');

      this.i ++;
    }
    else {
      var myEl = angular.element(document.querySelector('#next-question-button'));
      myEl.attr('disabled',"");

      var myEl = angular.element(document.querySelector('#prev-question-button'));
      myEl.removeAttr('disabled');
    }
   }

   Check_prev() {

    if (this.i == 1) {
      var myEl = angular.element(document.querySelector('#prev-question-button'));
      myEl.attr('disabled',"");
      var myEl = angular.element(document.querySelector('#next-question-button'));
      myEl.removeAttr('disabled');
      this.i --;
    }

    if (this.i > 0) {
      var myEl = angular.element(document.querySelector('#prev-question-button'));
      myEl.removeAttr('disabled');
      var myEl = angular.element(document.querySelector('#next-question-button'));
      myEl.removeAttr('disabled');
      this.i --;
    }
    else {
      var myEl = angular.element(document.querySelector('#prev-question-button'));
      myEl.attr('disabled',"");
      var myEl = angular.element(document.querySelector('#next-question-button'));
      myEl.removeAttr('disabled');
    }
   
   }

   report(){
    this.$http.get("/api/questions/"+this.awesomeQuestion[this.num]._id).then(response =>{
      this.$http.put("/api/questions/"+this.awesomeQuestion[this.num]._id,{ 
        _id : this.awesomeQuestion[this.num]._id,
        nbContestation : response.data.nbContestation + 1
      })
    })/*
    
    console.log(this.awesomeQuestion[0].nbContestation)
    console.log("id id ")
    console.log(this.awesomeQuestion[0]._id)
    
     if (this.awesomeQuestion[0]._id == 1){
       
       var i = this.awesomeQuestion[0].nbContestation+1;
       //console.log("Je suis bon")
       //console.log(i)
      this.$http.put("/api/questions/1", {  
        _id : this.awesomeQuestion[0]._id,
        nbContestation: i,
        test :"ceci est un test"
      })

      console.log("après ma condition")
      console.log(i)
     }*/
      

   }


  validation(select){

    this.all_answers[this.i] = select.id;
    this.answered[this.i]=1;

    if ( (this.all_answers[this.i] == this.all_correct_answers[this.i]) ) {
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
    else if ( (this.all_answers[this.i] != this.all_correct_answers[this.i])) {

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
    }
  }

//ng-if="$ctrl.answered[$ctrl.i] == 1" ng-init="$ctrl.submit()"
  submit(){
    alert('__'+this.answered[this.i]);
  }

  countdown($scope) {
        $scope.counter --;
      };
       
        
   stop($scope){
       $scope.counter --;
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


      /*var variable = '#label-choices-'+this.all_answers[this.i];
      var myEl = angular.element( document.querySelector( variable ) );
      myEl.removeAttr('class');
      //myEl.attr('class',"chicked");*/

      //(this.all_answers[this.i] != 0) &&


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




/*    $scope.$on('$viewContentLoaded', function(){

    if (this.answered[this.i] == 1) {

      if ( (this.all_answers[this.i] == this.all_correct_answers[this.i]) ) {

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
      else if ((this.all_answers[this.i] != this.all_correct_answers[this.i])) {

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
      }
  }
});*/