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
    this.i = 0;
    this.listBadges2 = [];
    this.listAwards2 = [];


    /*
    $scope.launch = function() {
          dialogs.notify();

    }; // end launch
    */

    this.getCurrentUser = Auth.getCurrentUserSync;

  }

  install() {
    //dialogs.wait('Creating User','Please wait while we attempt to create user "Michael Conroy."<br><br>This should only take a moment.',50);
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
/*
        this.$http.post("/api/awards/create/", {
          BadgeId : 1,
          badgeCount : 1,
          date: new Date(),
        });

*/

/*
        this.$http.put("/api/awards/"+1, {
          badgeCount : 15,
          _id: 5
        });
*/

        this.$http.get('/api/awards/user/')
        .then(response => {
          this.listAwards = response.data;
          console.log(this.listAwards)
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
