import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './listquestion.routes';

export class ListquestionController {
  $http;
  socket;
  awesomeListQuestion = [];
  awesomeConcept = [];
  reponseGlobal = {};
  blabla = "génial";
  newThing = '';
  

  
  /*@ngInject*/
  constructor($http, $scope, socket) {
    this.$http = $http;
    this.socket = socket;  
    

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('question');
    });
  }
  
  $onInit() {

    this.$http.get('/api/concepts')
    .then(response => {
      this.awesomeConcept = response.data;
      //console.log(response.data)
      
      
      this.$http.get('/api/questions/myquestion')
      .then(response => {
       this.awesomeListquestion = response.data;
       //console.log(response.data)

      for (var i=0; i<this.awesomeListquestion.length; i++){
           // var numConcept = this.awesomeListquestion[i].concept['concept']['name'];
           var numConcept = this.awesomeListquestion[i].concept
           
          if( this.reponseGlobal[numConcept] == undefined){
            this.reponseGlobal[numConcept] = [];
            this.reponseGlobal[numConcept].push(this.awesomeListquestion[i].question);
            
           }else {
            this.reponseGlobal[numConcept].push(this.awesomeListquestion[i].question);
           }
         
      }  
      console.log("coucou")
      console.log(this.reponseGlobal)

    })

  })
      
      }
  }

export default angular.module('skillGameApp.listquestion', [uiRouter])  
  .config(routing)
  .component('listquestion', {
    template: require('./listquestion.html'),
    controller: ListquestionController
  })
  .name;


