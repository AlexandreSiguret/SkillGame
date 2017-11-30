'use strict';
/* eslint no-sync: 0 */

import angular from 'angular';

export class NavbarComponent {
  menu = [{
    title: 'SkillGame',
    state: 'main'
  },
  {
    title: 'Questions',
    state: 'questions'
  },{
    title: 'Play',
    state: 'jeu'
  },
  {
    title: 'My Games',
    state: 'game'
  },{
    title : "Battle",
    state : "affrontement"
  },{
    title : "Ranking",
    state : "classement"
  }, {
    title : "Play_clock",
    state : "jeuchrono"
  }
];
  isLoggedIn: Function;
  isAdmin: Function;
  getCurrentUser: Function;
  isCollapsed = true;

  constructor(Auth) {
    'ngInject';

    this.isLoggedIn = Auth.isLoggedInSync;
    this.isAdmin = Auth.isAdminSync;
    this.getCurrentUser = Auth.getCurrentUserSync;
  }

}

export default angular.module('directives.navbar', [])
  .component('navbar', {
    template: require('./navbar.html'),
    controller: NavbarComponent
  })
  .name;
