import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './question.routes';

export class QuestionController {
  $scope;
  $http;
  $timeout
  socket;
  stopped;
  


  
  /*@ngInject*/
  constructor($http, $scope, socket, $timeout,$stateParams) {
    this.$timeout=$timeout;
    this.$scope=$scope;
    this.$stateParams = $stateParams;
    this.$http = $http;
    this.socket = socket;
    $scope.counter = 30;
    $scope.stopped = false;
       
    this.errormessage = ""
    this.questionChoices=[];
    this.singleQuestion=[];
    this.idChoices = [];
    this.num = 0;
    this.concept;
    this.currentScore = 0;

          


    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('question');
    });

    $scope.onTimeout = function(){

      if($scope.counter == 0) {

        
        
        var variable = '#label-choices-'+this.detailedQuestion._id;
        var myEl = angular.element( document.querySelector( variable ) );
        myEl.removeAttr('class');
        myEl.attr('class',"false");

      
        
        for (var i = 0; i < this.idChoices.length; i++) {
          var variable = '#choices-'+this.idChoices[i];
          var myEl = angular.element( document.querySelector( variable ) );
          myEl.attr('disabled',"");
        }

        if(this.num < 1)
        {
          var myEl = angular.element(document.querySelector('#next-question-button'));
          myEl.removeAttr('disabled');

          var myEl = angular.element(document.querySelector('#report-question-button'));
          myEl.removeAttr('disabled');
        }       

        
       
        $scope.stopped=true;

        this.$http.put('/api/answers/'+ this.singleQuestion._id,{
          _id :this.singleQuestion._id,
          earnedPoint : 0
        })
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
    this.call_question()
  }

  call_question() {
    this.$http.get('/api/answers/pickone/'+this.$stateParams.game_id)
    .then(response => {
      this.singleQuestion = response.data[0];
	  
	  this.$http.get("/api/questions/"+response.data[0].Question._id)
      .then(response => {
        this.concept = response.data.ConceptId;        
      });
	  
      this.$http.get("/api/choices/question/"+this.singleQuestion.Question._id)
      .then(response => {
        this.questionChoices = response.data;
      });

      this.$http.get("/api/questions/"+this.singleQuestion.Question._id)
      .then(response => {
        this.detailedQuestion = response.data;

          for (var i = 0; i < 4; i++) {
            this.idChoices[i]=this.questionChoices[i]._id;

            if (this.questionChoices[i].statement == this.detailedQuestion.goodAnswer)
              this.detailedQuestion._id = this.questionChoices[i]._id;
          }

      });
    });
  }
  

  Check_next() {
    this.errormessage = "";
    var myEl = angular.element(document.querySelector('#next-question-button'));
    myEl.attr('disabled',"");

    var myEl = angular.element(document.querySelector('#report-question-button'));
    myEl.attr('disabled',"");  

    this.call_question()


    this.num++;
    this.$scope.counter = 30;
    this.$scope.stopped=false;

  }

  report(){
          // alert('Question Reported !');
          if(this.errormessage ==""){
            
           
            this.errormessage = "the question has been reported"
            this.$http.get("/api/questions/"+this.singleQuestion.Question._id).then(response =>{
              this.$http.put("/api/questions/"+this.singleQuestion.Question._id,{ 
                _id : this.singleQuestion.Question._id,
                nbContestation : response.data.nbContestation + 1
              })
            })
          }
        }

        

        validation(select){

          if ( this.detailedQuestion.goodAnswer == select.statement ) {

            this.$http.put('/api/answers/'+ this.singleQuestion._id,{
              _id :this.singleQuestion._id,
              earnedPoint : this.$scope.seconds
            })

			this.$http.get("/api/scores/"+this.concept) 
            .then(response => {         
             
              
              if(response.data.length == 0){                 
                this.$http.post('/api/scores',{
                  score :  this.$scope.seconds,              
                  ConceptId : this.concept
                }) 
                     
              }
              else{
                this.currentScore = response.data.score;
                this.$http.put('/api/scores/'+ response.data._id,{
                  score : this.currentScore + this.$scope.seconds,
                  ConceptId : this.concept
                }) 
              }
          })
            
			
            var variable = '#label-choices-'+select._id;
            var myEl = angular.element( document.querySelector( variable ) );
            myEl.removeAttr('class');
            myEl.attr('class',"true");

            for (var i = 0; i < this.idChoices.length; i++) {
              var variable = '#choices-'+this.idChoices[i];
              var myEl = angular.element( document.querySelector( variable ) );
              myEl.attr('disabled',"");
            }
          }
          else {
           

            this.$http.put('/api/answers/'+ this.singleQuestion._id,{
              _id :this.singleQuestion._id,
              earnedPoint : 0
            })

            var variable = '#label-choices-'+this.detailedQuestion._id;
            var myEl = angular.element( document.querySelector( variable ) );
            myEl.removeAttr('class');
            myEl.attr('class',"true");

            var variable2 = '#label-choices-'+select._id;
            var myE2 = angular.element( document.querySelector( variable2 ) );
            myE2.removeAttr('class');
            myE2.attr('class',"false");

            for (var i = 0; i < this.idChoices.length; i++) {
              var variable = '#choices-'+this.idChoices[i];
              var myEl = angular.element( document.querySelector( variable ) );
              myEl.attr('disabled',"");
            } 

          }

          if(this.num < 1) {
            var myEl = angular.element(document.querySelector('#next-question-button'));
            myEl.removeAttr('disabled');
            var myEl = angular.element(document.querySelector('#report-question-button'));
            myEl.removeAttr('disabled');
          }
          else {
            this.$timeout(function() { 

              var variable2 = '#quiz';
              var myE2 = angular.element( document.querySelector( variable2 ) );
              myE2.attr('style',"display: none;");

              var variable2 = '#quiz-resulats';
              var myE2 = angular.element( document.querySelector( variable2 ) );
              myEl.removeAttr('style');
              myE2.attr('style',"display: inline;");

            //this.valeur=true;/*alert('Test Terminer !! Redirection vers la page ..... !!');*/

          }, 2000);
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