'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './jeuchrono.routes';

export class JeuchronoComponent {
  $scope;
  $http;
  $timeout;
  socket;
  stopped;




  /*@ngInject*/
  constructor($http, $scope, socket, $timeout, $stateParams) {
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
    })

    $scope.onTimeout = function(){

      if($scope.counter == 0){

        var variable = '#label-choices-'+this.detailedQuestion._id;
      }

    }



  }

 
      }

export default angular.module('skillGameApp.jeuchrono', [uiRouter])
  .config(routes)
  .component('jeuchrono', {
    template: require('./jeuchrono.html'),
    controller: JeuchronoComponent,
    controllerAs: 'jeuchronoCtrl'
  })
  .name;
