import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './listquestion.routes';

export class ListquestionController {
  $http;
  socket;
  awesomeListQuestion = [];
  awesomeConcept = [];
  awesomeUser = [];
  blabla = "génial";
  newThing = '';
  

  
  /*@ngInject*/
  constructor($http, $scope, socket) {
    this.$http = $http;
    this.socket = socket;
    //this.i= 0;
    this.i= this.awesomeListQuestion_id;
    
    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('question');
    });
  }
  
  
  $onInit() {
    this.$http.get('/api/questions/myquestion')
      .then(response => {
        this.awesomeListQuestion = response.data;
        console.log(response.data)
        //console.log(this.controleQuestion)
      });
      
  }
  
 

  }

export default angular.module('skillGameApp.listquestion', [uiRouter])  
  .config(routing)
  .component('listquestion', {
    template: require('./listquestion.html'),
    controller: ListquestionController
  })
  .name;


