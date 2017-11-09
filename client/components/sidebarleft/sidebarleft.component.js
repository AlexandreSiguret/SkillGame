import angular from 'angular';

export class SidebarleftComponent {}

export default angular.module('directives.sidebarleft', [])
  .component('sidebarleft', {
    template: require('./sidebarleft.html'),
    controller: SidebarleftComponent
  })
  .name;
