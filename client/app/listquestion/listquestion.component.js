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
<<<<<<< HEAD
=======
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
>>>>>>> bf3e48c530c37875ed313f790dcf1c73c7f42ddc

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


