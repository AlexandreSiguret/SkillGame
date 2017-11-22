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
  questionTri = {};
  

  
  /*@ngInject*/
  constructor($http, $scope, socket) {
    this.$http = $http;
    this.socket = socket;  
    
    

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('question');
    });
  }
  
  $onInit() {

    this.$http.get('/api/questions/myquestion')
      .then(response => {
        this.awesomeListQuestion = response.data;
        
        for(var i= 0; i< this.awesomeListQuestion.length;i++){

         if(this.questionTri[this.awesomeListQuestion[i]["Concept"]["name"]] == undefined){
            this.questionTri[this.awesomeListQuestion[i]["Concept"]["name"]] = [];
            this.questionTri[this.awesomeListQuestion[i]["Concept"]["name"]].push(this.awesomeListQuestion[i]["question"])
          }
        
          else{
            this.questionTri[this.awesomeListQuestion[i]["Concept"]["name"]].push(this.awesomeListQuestion[i]["question"])
          }


        }

        console.log(this.questionTri)
      });


    this.$http.get('/api/concepts')
    .then(response => {
      this.awesomeConcept = response.data;
      //console.log(response.data)
      
      


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


