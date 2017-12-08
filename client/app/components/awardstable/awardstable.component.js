'use strict';
const angular = require('angular');

export class awardstableComponent {
  $scope;
  $http;
  socket;
  getCurrentUser : Function;

  /*@ngInject*/
  constructor($http, $scope, socket, Auth) {
    this.$scope=$scope; 
    this.$http = $http;
    this.socket = socket;
    this.errormessage = ""
    this.concept;
    this.getCurrentUser = Auth.getCurrentUserSync;
    this.listAwards = [];


  }

  $onInit() {
    this.getUserAwards(5)
  }

  getUserAwards(userid,conceptid){
    if (userid == "") userid = this.getCurrentUser()._id
    this.$http.get('/api/awards/'+userid+'/'+conceptid)
    .then(response => {
      this.listAwards = response.data;
      this.socket.syncUpdates('award', this.listAwards);
      console.log("Awards: "+this.listAwards);
    });
  }


}


export default angular.module('skillGameApp.awardstable', [])
  .component('awardstable', {
    template: require('./awardstable.html'),
    controller: awardstableComponent
  })
  .name;
