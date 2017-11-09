import angular from 'angular';

export class HeaderComponent {}

export default angular.module('directives.header', [])
  .component('header', {
    template: require('./header.html'),
    controller: HeaderComponent
  })
  .name;
