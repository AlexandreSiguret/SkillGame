'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './badges.routes';

export class BadgesComponent {
  $http;
  socket; 
  getCurrentUser: Function;

  /*@ngInject*/
  constructor($http,$scope,socket,Auth,$location,$window,$rootScope,$timeout,dialogs) {
    this.$http = $http;
    this.$scope=$scope;
    this.socket = socket;
    this.listBadges = [];
    this.listAwards = [];
    this.listPlayers = [];
    this.i = 0;

    $scope.launch = function() {
          dialogs.notify();
          //this.$scope.launch();

    }; // end launch
    
    this.getCurrentUser = Auth.getCurrentUserSync;

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('user');
      socket.unsyncUpdates('award');
      socket.unsyncUpdates('badge');
    });
  }

  install() {
    dialogs.wait('Creating User','Please wait while we attempt to create user "Michael Conroy."<br><br>This should only take a moment.',50);
  }

  howManyStars(badge) {
    this.$scope.items = ['1.png', '2.png', '3.png', '4.png','5.png'];

    if ( badge.badgeCount < 5 && badge.badgeCount > 0 ) {
      return this.$scope.items[0];
    } else if ( badge.badgeCount < 10 && badge.badgeCount >= 5 ) {
      return this.$scope.items[1];
    } else if ( badge.badgeCount < 15 && badge.badgeCount >= 10 ) {
      return this.$scope.items[2];
    } else if ( badge.badgeCount < 20 && badge.badgeCount >= 15 ) {
      return this.$scope.items[3];
    } else {
      return this.$scope.items[4];
    }

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

          /*for (var i = 0; i < this.listAwards.length; i++) {
            this.listAwards[i].badgeCount
          }*/
         
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
