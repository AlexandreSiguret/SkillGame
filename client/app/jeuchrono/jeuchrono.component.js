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
    this.$timeout = $timeout;
    this.$scope = $scope;
    this.$stateParams = $stateParams;
    this.$http = $http;
    this.socket = socket;
    $scope.counter = 30;
    $scope.stopped = false;
    var vm = this;
    this.errormessage= ""
    this.questionChoices=[];
    this.singleQuestion= [];
    this.idChoices = [];

    this.$http.get('/api/answers/pickone/'+this.$stateParams.concepts)
    .then(response =>{
      this.singleQuestion = response.data[0];
      this.$http.get("/api/choices/question/"+this.singleQuestion.Question._id)
      .then(response => {
        this.questionChoices = response.data;
        console.log("ooooooooooooooooooo");
        console.log(response.data);
      });
    });

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
