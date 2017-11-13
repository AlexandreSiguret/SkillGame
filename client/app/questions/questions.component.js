import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './questions.routes';

export class QuestionsController {
  $http;
  socket;
  awesomeConcept = [];
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

  /*@ngInject*/
  constructor($http, $scope, socket) {
    this.$http = $http;
    this.socket = socket;

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('concept');
    });
  }

  $onInit() {
    this.$http.get('/api/concepts')
      .then(response => {
        this.awesomeConcept = response.data;

        console.log(this.controleQuestion)
      });
  }

  choix_concept(concept) {
    this.currentConcept = concept;
    this.choice = true;
    console.log(this.controleQuestion)
  }

  askQuestion() {
    console.log(this.controleQuestion)
    this.controleQuestion = true
  }

  addQuestion() {
    if (this.goodAnswer != "" && this.question != "" && this.WrongAnswer1 != "" && this.WrongAnswer2 != "" && this.WrongAnswer3 != "") {
      console.log("tu as tout rempli génial")
      this.$http.post("/api/questions", {
        question: this.question,
        nbAppearance: 0,
        nbContestation: 0,
        concept: this.currentConcept._id,
        goodAnswer: this.goodAnswer,
      })
      .then(response => {
        this.idNewQuestion = response.data._id
        console.log(this.idNewQuestion)
        this.$http.post("/api/choices", {
          question: this.idNewQuestion,
          statement: this.WrongAnswer1
        })
        this.$http.post("/api/choices", {
          question: this.idNewQuestion,
          statement: this.WrongAnswer1
        })
        this.$http.post("api/choices", {
          question: this.idNewQuestion,
          statement: this.WrongAnswer2
        })
        this.$http.post("api/choices", {
          question: this.idNewQuestion,
          statement: this.goodAnswer
        })

      })
    
    }
    else {
      console.log("tu as oublié un champ")
    }
  }


}


export default angular.module('skillGameApp.questions', [uiRouter])
  .config(routing)
  .component('questions', {
    template: require('./questions.html'),
    controller: QuestionsController
  })
  .name;
