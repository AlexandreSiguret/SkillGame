//'use strict';
//const angular = require('angular');

//const uiRouter = require('angular-ui-router');

import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routes from './jeuchrono.routes';

export class JeuchronoController {
  $scope;
  $http;
  $timeout;
  socket;
  stopped;
  getCurrentUser: Function; 
  allConceptId = [];
  awesomeConcept = [];
  newConcept = '';
  currentConcept = [];
  choice = false;




  /*@ngInject*/
  constructor($http, $scope, socket, $timeout, $stateParams, Auth) {
    this.$timeout = $timeout;
    this.$scope = $scope;
    this.$stateParams = $stateParams;
    this.$http = $http;
    this.socket = socket;
    $scope.counter = 99;  
    $scope.stopped = false;

    this.errormessage = ""
    this.messageTime = ""
    this.questionChoices = [];
    this.singleQuestion = [];
    this.singleQuestionAfter = 0;
    this.idChoices = [];
    this.num = 0;
    this.concept;
    this.currentScore = 0;
    this.myIndice = 0;
    this.fini = "Le test est fini";
    this.earnedPoint = 0;
    this.getCurrentUser = Auth.getCurrentUserSync;
    // this.controlTime = false;


    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('question');
    });

    $scope.onTimeout = function () {

      if ($scope.counter == 0) { 
         
        //this.controlTime = true;
        //console.log(this.controlTime);
        console.log("je rentre bien dans la function $scope.onTimeout à près que le time soit fini");
        var variable2 = '#quiz';
        var myE2 = angular.element(document.querySelector(variable2)); 
        myE2.attr('style', "display: none;");

      /*   var variable2 = '#quiz-resulats';
        var myE2 = angular.element(document.querySelector(variable2));
        myEl.removeAttr('style');
        myE2.attr('style', "display: inline;");  */

       /*  var variable = '#label-choices-' + this.detailedQuestion._id;
        var myEl = angular.element(document.querySelector(variable));
        myEl.removeAttr('class');
        myEl.attr('class', "false");
 */
       // for (var i = 0; i < this.idChoices.length; i++) {
          //var variable = '#choices-' + this.idChoices[i];
          //var myEl = angular.element(document.querySelector(variable));
          //myEl.attr('disabled', "");



          

          /* var myEl = angular.element(document.querySelector('#next-question-button'));
          myEl.removeAttr('disabled');

          var myEl = angular.element(document.querySelector('#report-question-button'));
          myEl.removeAttr('disabled');
 */

          // console.log(" score final");

          /* this.$http.put('/api/alonescores/'+ this.concept,{ 
             ConceptId : this.concept,
             alonescore : this.earnedPoint,  
             UserId : this.getCurrentUser()._id
         }); */

       // }
/* 
        if (this.num < this.singleQuestionAfter) {
          console.log("je rentre bien ici àprès validation");
          var myEl = angular.element(document.querySelector('#next-question-button'));
          myEl.removeAttr('disabled');

          var myEl = angular.element(document.querySelector('#report-question-button'));
          myEl.removeAttr('disabled');
        } */



        // $scope.stopped=true;

        //   this.$http.put('/api/alonescores/'+ this.concept,{ 
        //     ConceptId : this.concept,
        //     alonescore : this.earnedPoint  
        //   })

        // console.log(" Après ajout du score");   
      }

      if ($scope.stopped != true) { $scope.counter--; }

      $scope.minutes = Math.floor((($scope.counter / 60)));
      $scope.seconds = Math.floor($scope.counter - ($scope.minutes * 60));
      mytimeout = $timeout($scope.onTimeout, 1000);
    }
    var mytimeout = $timeout($scope.onTimeout, 1000); 
  }

  $onInit() {
    this.call_question()
  }

  call_question() {

    this.$http.get('/api/questions/takequest/' + this.$stateParams.ConceptId)
      .then(response => {
        this.singleQuestionAfter = response.data.length;
        console.log(this.singleQuestionAfter);
        this.singleQuestion = response.data[this.myIndice];
        console.log("1111--question---oooooooooooooooooo");
        console.log(this.singleQuestion.question);

        this.$http.get("/api/questions/" + this.singleQuestion._id)
          .then(response => {
            this.concept = response.data.ConceptId;
            console.log("222--concept--oooooooooooooooooo");
            console.log(this.concept);
          });

        this.$http.get("/api/choices/question/" + this.singleQuestion._id)
          .then(response => {
            this.questionChoices = response.data;
            console.log("333--choice--oooooooooooooooooo");
            console.log(this.questionChoices);
          });

        this.$http.get("/api/questions/" + this.singleQuestion._id)
          .then(response => {
            this.detailedQuestion = response.data;

            for (var i = 0; i < 4; i++) {
              this.idChoices[i] = this.questionChoices[i]._id;

              if (this.questionChoices[i].statement == this.detailedQuestion.goodAnswer)
                this.detailedQuestion._id = this.questionChoices[i]._id;
            }

          });
      });
  }



  Check_next() {
    this.myIndice++;
    this.num++;

    if (this.num < this.singleQuestionAfter) {
      this.call_question()
    } else {
      this.errormessage = "";
      var myEl = angular.element(document.querySelector('#next-question-button'));
      myEl.attr('disabled', "");

      var myEl = angular.element(document.querySelector('#report-question-button'));
      myEl.attr('disabled', "");


      var variable2 = '#quiz';
      var myE2 = angular.element(document.querySelector(variable2));
      myE2.attr('style', "display: none;");
  
      var variable2 = '#quiz-resulats';
      var myE2 = angular.element(document.querySelector(variable2));
      myEl.removeAttr('style');
      myE2.attr('style', "display: inline;");

      this.game_finish() 
  /*     var variable2 = '#quiz';
      var myE2 = angular.element(document.querySelector(variable2));
      myE2.attr('style', "display: none;");

      var variable2 = '#quiz-resulats';
      var myE2 = angular.element(document.querySelector(variable2));
      myEl.removeAttr('style');
      myE2.attr('style', "display: inline;");

      console.log(" score final bien inséré");

      this.$http.put('/api/alonescores/' + this.concept, {
        ConceptId: this.concept,
        alonescore: this.earnedPoint,
        UserId: this.getCurrentUser()._id
      }); */

    }
    // if (this.$scope.counter != 0){
      this.$scope.counter--;
    //}
    
    this.$scope.stopped = false;
  }

  game_finish() { 

    console.log(" score final bien inséré");

    this.$http.put('/api/alonescores/' + this.concept, {
      ConceptId: this.concept,
      alonescore: this.earnedPoint,
      UserId: this.getCurrentUser()._id
    });
  }

  report() {
    // alert('Question Reported !');
    if (this.errormessage == "") {

      this.errormessage = "the question has been reported"
      this.$http.get("/api/questions/" + this.singleQuestion._id).then(response => {
        this.$http.put("/api/questions/" + this.singleQuestion._id, {
          _id: this.singleQuestion._id,
          nbContestation: response.data.nbContestation + 1
        })
      })
    }
  }



  validation(select) {
    console.log("on appele validation")
    if (this.detailedQuestion.goodAnswer == select.statement) {
      this.earnedPoint++;

      console.log("Je gagne point");
      console.log(this.earnedPoint);

      var variable = '#label-choices-' + select._id;
      var myEl = angular.element(document.querySelector(variable));
      myEl.removeAttr('class');
      myEl.attr('class', "true");

      for (var i = 0; i < this.idChoices.length; i++) {
        var variable = '#choices-' + this.idChoices[i];
        var myEl = angular.element(document.querySelector(variable));
        myEl.attr('disabled', "");
      }
    }
    else {

      this.earnedPoint;

      console.log("Je gagne pas de point");
      console.log(this.earnedPoint);

      var variable = '#label-choices-' + this.detailedQuestion._id;
      var myEl = angular.element(document.querySelector(variable));
      myEl.removeAttr('class');
      myEl.attr('class', "true");

      var variable2 = '#label-choices-' + select._id;
      var myE2 = angular.element(document.querySelector(variable2));
      myE2.removeAttr('class');
      myE2.attr('class', "false");

      for (var i = 0; i < this.idChoices.length; i++) {
        var variable = '#choices-' + this.idChoices[i];
        var myEl = angular.element(document.querySelector(variable));
        myEl.attr('disabled', "");
      }

    }

    if (this.num < this.singleQuestionAfter) {
      //  console.log("je rentré fois");
      // console.log(this.num); 

      var myEl = angular.element(document.querySelector('#next-question-button'));
      myEl.removeAttr('disabled');
      var myEl = angular.element(document.querySelector('#report-question-button'));
      myEl.removeAttr('disabled');
    }
    else {
      this.$timeout(function () { 

        var variable2 = '#quiz';
        var myE2 = angular.element(document.querySelector(variable2));
        myE2.attr('style', "display: none;");

        var variable2 = '#quiz-resulats';
        var myE2 = angular.element(document.querySelector(variable2));
        myEl.removeAttr('style');
        myE2.attr('style', "display: inline;");

        // console.log("on va appeler score")

        //this.$http.put('/api/alonescores/'+ this.concept,{
        //  ConceptId : this.concept,
        //  alonescore : this.earnedPoint  
        // })

        //this.valeur=true;/*alert('Test Terminer !! Redirection vers la page ..... !!');*/

      }, 2000);     
    }
    // this.$scope.stopped=true;

  }

}


export default angular.module('skillGameApp.jeuchrono', [uiRouter])
  .config(routes)
  .component('jeuchrono', {
    template: require('./jeuchrono.html'),
    controller: JeuchronoController
  })
  .name;
