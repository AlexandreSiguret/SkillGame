import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './question.routes';



export class QuestionController {
  $scope;
  $http;
  $timeout
  socket;
  stopped;
  num = 0;

/*  link:ng.IDirectiveLinkFn = (scope:ng.IScope, element:ng.IAugmentedJQuery, attr:ng.IAttributes) => {
    this.$timeout(function () {
      console.log(this.counter);
      this.counter--;
    },1000);
  };
  */

  
  /*@ngInject*/
  constructor($http, $scope, socket, $timeout) {
    this.$timeout=$timeout;
    this.$scope=$scope;
    this.$http = $http;
    this.socket = socket;
    this.all_correct_answers = [4, 4, 4, 4, 4];
    this.all_answers = [];
    this.answered = [0,0,0,0,0];
    this.resultats = 0;
    $scope.counter = 30;
    $scope.stopped = false;
    var vm = this;
    this.errormessage = ""
    

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

              $scope.$on('$destroy', function() {
                socket.unsyncUpdates('question');
              });

              $scope.onTimeout = function(){

                if($scope.counter == 0) {

                  var variable = '#label-choices-'+vm.all_correct_answers[vm.num];
                  var myEl = angular.element( document.querySelector( variable ) );
                  myEl.removeAttr('class');
                  myEl.attr('class',"false");

                  for (var i = 1; i < 5; i++) {
                    var variable = '#choices-'+i;
                    var myEl = angular.element( document.querySelector( variable ) );
                    myEl.attr('disabled',"");
                  }

                  if(vm.num < 4)
                  {
                    var myEl = angular.element(document.querySelector('#next-question-button'));
                    myEl.removeAttr('disabled');

                    var myEl = angular.element(document.querySelector('#report-question-button'));
                    myEl.removeAttr('disabled');
                  }

                  $scope.stopped=true;
                }

                if($scope.stopped != true)
                  {$scope.counter--;}

                

                $scope.minutes = Math.floor((($scope.counter / 60)));
                $scope.seconds = Math.floor($scope.counter - ($scope.minutes * 60));
                mytimeout = $timeout($scope.onTimeout,1000);
              }
              var mytimeout = $timeout($scope.onTimeout,1000);
             
            }


            $onInit() {
              this.$http.get('/api/answers/pickone/35')

              .then(response => {
                
                this.singleQuestion = response.data;
                console.log("response.data")
                console.log(response.data)
              });

            }

            Check_next() {
             console.log(this.singleQuestion[0]._id)
              this.$http.put('/api/answers/'+ this.singleQuestion[0]._id,{
                _id :this.singleQuestion[0]._id,
                earnedPoint : this.$scope.seconds,
              })    
             
             

            this.errormessage = "";
             var myEl = angular.element(document.querySelector('#next-question-button'));
             myEl.attr('disabled',"");

             var myEl = angular.element(document.querySelector('#report-question-button'));
             myEl.attr('disabled',"");

             this.num++;
             this.$scope.counter = 30;
             this.$scope.stopped=false;

           }

           report(){
          // alert('Question Reported !');
          if(this.errormessage ==""){

            this.errormessage = "the question :"+this.singleQuestion
            /*this.errormessage = "the question has been reported"*/
            this.$http.get("/api/questions/"+this.awesomeQuestion[this.num]._id).then(response =>{
              this.$http.put("/api/questions/"+this.awesomeQuestion[this.num]._id,{ 
                _id : this.awesomeQuestion[this.num]._id,
                nbContestation : response.data.nbContestation + 1
              })
            })
          }
          }


          validation(select){

            this.all_answers[this.num] = select.id;
            this.answered[this.num]=1;

            if ( (this.all_answers[this.num] == this.all_correct_answers[this.num]) ) {
              var variable = '#label-choices-'+this.all_answers[this.num];
              var myEl = angular.element( document.querySelector( variable ) );
              myEl.removeAttr('class');
              myEl.attr('class',"true");

              for (var i = 1; i < 5; i++) {
                var variable = '#choices-'+i;
                var myEl = angular.element( document.querySelector( variable ) );
                myEl.attr('disabled',"");
              }

            }
            else if ( (this.all_answers[this.num] != this.all_correct_answers[this.num])) {

              var variable = '#label-choices-'+this.all_correct_answers[this.num];
              var myEl = angular.element( document.querySelector( variable ) );
              myEl.removeAttr('class');
              myEl.attr('class',"true");

              var variable2 = '#label-choices-'+this.all_answers[this.num];
              var myE2 = angular.element( document.querySelector( variable2 ) );
              myE2.removeAttr('class');
              myE2.attr('class',"false");

              for (var i = 1; i < 5; i++) {
                var variable = '#choices-'+i;
                var myEl = angular.element( document.querySelector( variable ) );
                myEl.attr('disabled',"");
              } 

            }
            if(this.num < 4) {
              var myEl = angular.element(document.querySelector('#next-question-button'));
              myEl.removeAttr('disabled');
              var myEl = angular.element(document.querySelector('#report-question-button'));
              myEl.removeAttr('disabled');
            }
            else {
              this.$timeout(function() { alert('Test Terminer !! Redirection vers la page ..... !!');}, 2000);
            }
            this.$scope.stopped=true;
          }
        }

        export default angular.module('skillGameApp.question', [uiRouter])
        .config(routing)
        .component('question', {
          template: require('./question.html'),
          controller: QuestionController
        })
        .name;