import angular from 'angular';
//import fileUpload from '../../node_modules/ng-file-upload/dist/ng-file-upload.min'
import uiRouter from 'angular-ui-router';
import routing from './questions.routes';
//var app = angular.module('fileUpload', ['ngFileUpload']);

export class QuestionsController {
  $http;
  socket;
  allConceptId=[];
  awesomeConcept = [];
  awesomeConceptId = {}
  newConcept = '';
  currentConcept = [];
  choice = false;
  controleQuestion = false;
  question = ""
  goodAnswer = ""
  WrongAnswer1 = ""
  WrongAnswer2 = ""
  WrongAnswer3 = ""
  idNewQuestion = ""
  message = ""


  /*@ngInject*/
  constructor($http, $scope, socket, $window,$stateParams) {
    this.$http = $http;
    this.socket = socket;
    this.$window=$window;
    this.$stateParams = $stateParams;


   $scope.cloud = [],

  this.$scope = $scope

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('concept');
    });
  }

  $onInit() {
    this.$http.get('/api/concepts')
      .then(response => {
        this.awesomeConcept = response.data;
        this.$scope.cloud = []
        for (var i = 0; i < response.data.length; i++) {
         var a = { text :  response.data[i].name, weight: i , link : "http://localhost:3000/questions/"+ response.data[i]._id}
         this.$scope.cloud.push(a)
          this.awesomeConceptId[response.data[i]._id] = {name :response.data[i].name }
          console.log(this.awesomeConceptId[response.data[i]._id])
          console.log(response.data[i].name )
        
        }

        if(this.awesomeConceptId[this.$stateParams.id] != undefined){
          console.log("on est definie")
          
          this.currentConcept = {"_id" : this.$stateParams.id,name : this.awesomeConceptId[this.$stateParams.id]["name"] }
          console.log(this.currentConcept)
          this.choice = true;
        }
        else{
          console.log('ce n"est pas définie')
        }
        
       
      }
      
    )

      
      ;
  }

  /*uploadPic(file) {
    file.upload = Upload.upload({
      url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
      data: {
        username: $scope.username,
        file: file
      },
    });

    file.upload.then(function(response) {
      $timeout(function() {
        file.result = response.data;
      });
    }, function(response) {
      if (response.status > 0)
        $scope.errorMsg = response.status + ': ' + response.data;
    }, function(evt) {
      // Math.min is to fix IE which reports 200% sometimes
      file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
    });
  }
*/


  choix_concept(concept) {
/*
    
    for (var i = 0; i < this.allConceptId.length; i++) {

      var variable = '#concept-'+this.allConceptId[i];
      var myEl = angular.element( document.querySelector( variable ) );
      myEl.removeAttr('class');
    }

    var variable = '#concept-'+concept._id;
    var myEl = angular.element( document.querySelector( variable ) );
    myEl.attr('class',"active");


    color: #fff;
    background-color: #166e70*/

    this.currentConcept = concept;
    console.log(this.currentConcept)
    this.choice = true;
   // console.log(this.controleQuestion)

   // console.log(" Je suis this.currentConcept._id");
   // console.log(this.currentConcept._id);
  }





  addQuestion() {
    if (this.goodAnswer != "" && this.question != "" && this.WrongAnswer1 != "" && this.WrongAnswer2 != "" && this.WrongAnswer3 != "") {
      console.log("tu as tout rempli génial")
      this.$http.post("/api/questions", {
        question: this.question,
        nbAppearance: 0,
        nbContestation: 0,
        ConceptId: this.currentConcept._id,
        goodAnswer: this.goodAnswer,
      })
      .then(response => {
        this.idNewQuestion = response.data._id
        console.log(this.idNewQuestion)
        this.$http.post("/api/choices", {
          QuestionId: this.idNewQuestion,
          statement: this.WrongAnswer1
        })
        this.$http.post("/api/choices", {
          QuestionId: this.idNewQuestion,
          statement: this.WrongAnswer3
        })
        this.$http.post("api/choices", {
          QuestionId: this.idNewQuestion,
          statement: this.WrongAnswer2
        })
        this.$http.post("api/choices", {
          QuestionId: this.idNewQuestion,
          statement: this.goodAnswer
        }
        
      )
      this.goodAnswer =""
      this.WrongAnswer1 =""
      this.WrongAnswer2 =""
      this.WrongAnswer3 = ""
      this.question = ""
      this.message ="La question à bien été ajouté"
      })


    
    }
    else {
      this.message="tu as oublié un champ"
    }
    console.log(this.message)
  }


}


export default angular.module('skillGameApp.questions', [uiRouter])
  .config(routing)
  .component('questions', {
    template: require('./questions.html'),
    controller: QuestionsController
  })
  .name;
