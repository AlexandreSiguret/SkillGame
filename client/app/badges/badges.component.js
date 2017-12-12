'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './badges.routes';

export class BadgesComponent {
  $http;
  socket; 
  getCurrentUser: Function;

  /*@ngInject*/
  constructor($http, $scope, socket, Auth, $location,$window) {
    this.$http = $http;
    this.socket = socket;
    this.listBadges = [];
    this.listAwards = [];
    this.listPlayers = [];
    
    this.getCurrentUser = Auth.getCurrentUserSync;

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('user');
      socket.unsyncUpdates('award');
      socket.unsyncUpdates('badge');
    });
  }

  $onInit() {    
    
        this.$http.get("/api/users")
        .then(response =>{
          this.listPlayers = response.data;
          console.log(this.listPlayers)
        });
        this.$http.get('/api/awards/'+this.getCurrentUser()._id)
        .then(response => {
          this.listAwards = response.data;
    //      this.listAwards2 = response.data;
          console.log(this.listAwards);
        });
        this.$http.get("/api/badges")
        .then(response =>{
          this.listBadges = response.data;
          console.log(this.listBadges)
        });

    }







}

export default angular.module('skillGameApp.badges', [uiRouter])
  .config(routes)
  .component('badges', {
    template: require('./badges.html'),
    controller: BadgesComponent,
    controllerAs: 'badgesCtrl'
  })
  .name;
