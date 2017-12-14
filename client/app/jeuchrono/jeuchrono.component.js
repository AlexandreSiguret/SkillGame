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
  choice = false;
  awesomeAllQuestion = [];
  singleQuestion = [];




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
    this.questionChoices = [];
    this.idChoices = [];
    this.num = 0;
    this.myIndice = 0;
    this.earnedPoint = 0;
    this.getCurrentUser = Auth.getCurrentUserSync;


    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('question');
    });

    $scope.onTimeout = function () {

      if ($scope.counter == 0) {
        var variable2 = '#quiz';
        var myE2 = angular.element(document.querySelector(variable2));
        myE2.attr('style', "display: none;");
      }

      if ($scope.stopped != true) { $scope.counter--; }

      $scope.minutes = Math.floor((($scope.counter / 60)));
      $scope.seconds = Math.floor($scope.counter - ($scope.minutes * 60));
      mytimeout = $timeout($scope.onTimeout, 1000);
    }
    var mytimeout = $timeout($scope.onTimeout, 1000);
  }

  $onInit() {
    this.$http.get('/api/questions/takequest/' + this.$stateParams.ConceptId)
      .then(response => {
        this.awesomeAllQuestion = response.data;
        this.call_question()
      });

  }

  call_question() {
    this.$http.get("/api/choices/question/" + this.awesomeAllQuestion[this.myIndice]._id)
      .then(response => {
        this.questionChoices = response.data;

        this.detailedQuestion = this.awesomeAllQuestion[this.myIndice];

        for (var i = 0; i < 4; i++) {
          this.idChoices[i] = this.questionChoices[i]._id;
          if (this.questionChoices[i].statement == this.detailedQuestion.goodAnswer)
            this.detailedQuestion._id = this.questionChoices[i]._id;
        }
      });
  }



  Check_next() {
    this.myIndice++;
    this.num++;

    if (this.num < this.awesomeAllQuestion.length) {
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
      myE2.removeAttr('style');
      myE2.attr('style', "display: inline;");

      var variable1 = '#badge-award';
        var myE1 = angular.element( document.querySelector( variable1 ) );
        myE1.removeAttr('style');
        myE1.attr('style',"display: inline;");


      this.game_finish()
    }
    this.$scope.counter--;
    this.$scope.stopped = false;
  }

  game_finish() {

    console.log(" score final bien inséré");

    this.$http.put('/api/alonescores/' + this.$stateParams.ConceptId, {
      ConceptId: this.$stateParams.ConceptId,
      alonescore: this.earnedPoint,
      UserId: this.getCurrentUser()._id
    });
  }

  report() {
    // alert('Question Reported !');
    if (this.errormessage == "") {

      this.errormessage = "the question has been reported"
      this.$http.get("/api/questions/" + this.awesomeAllQuestion[this.myIndice]._id).then(response => {
        this.$http.put("/api/questions/" + this.awesomeAllQuestion[this.myIndice]._id, {
          _id: this.awesomeAllQuestion[this.myIndice]._id,
          nbContestation: response.data.nbContestation + 1
        })
      })
    }
  }



  validation(select) {
    console.log("on appele validation")
    if (this.detailedQuestion.goodAnswer == select.statement) {
      this.earnedPoint++;

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

    if (this.num < this.awesomeAllQuestion.length) {

      var myEl = angular.element(document.querySelector('#next-question-button'));
      myEl.removeAttr('disabled');
      var myEl = angular.element(document.querySelector('#report-question-button'));  
      myEl.removeAttr('disabled');
    }
    else {
      this.$timeout(function () {

        var variable2 = '#quiz-resulats';
        var myE2 = angular.element(document.querySelector(variable2));
        myEl.removeAttr('style');
        myE2.attr('style', "display: inline;");

        var variable1 = '#badge-award';
        var myE1 = angular.element( document.querySelector( variable1 ) );
        myE1.removeAttr('style');
        myE1.attr('style',"display: inline;");

      }, 2000);
    }

  }
}

export default angular.module('skillGameApp.jeuchrono', [uiRouter])
  .config(routes)
  .component('jeuchrono', {
    template: require('./jeuchrono.html'),
    controller: JeuchronoController
  })
  .name;
