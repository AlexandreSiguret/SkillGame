import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './questions.routes';

export class QuestionsController {
  $http;
  //socket;
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
  message = "";

 


  /*@ngInject*/
  constructor($http, $scope /*, socket*/, $window,$stateParams, Auth) {
    this.$http = $http;
    //this.socket = socket;
    this.$window=$window;
    this.$stateParams = $stateParams;
    this.showme = true;
    this.showus = true;
    this.$scope = $scope;
    this.currentScore = 0;
    this.getCurrentUser = Auth.getCurrentUserSync;
    this.listAwards = [];
    this.correctanswernumber=0;
    this.lastAward = [];
    this.badgeExistes = null;


   $scope.cloud = [],

    $scope.$on('$destroy', function () {
      //socket.unsyncUpdates('concept');
    });
  }

  $onInit() {

    //this.$http.delete("/api/questions/78").then(console.log('coucou'))

    var variable2 = '#badge-award';
    var myE2 = angular.element( document.querySelector( variable2 ) );
    myE2.removeAttr('style');
    myE2.attr('style',"display: none;");

    var variable2 = '#required_field';
    var myE2 = angular.element( document.querySelector( variable2 ) );
    myE2.removeAttr('style');
    myE2.attr('style',"display: none;");


   
    this.$http.get('/api/concepts/numberquestion')
      .then(response => {
        this.awesomeConcept = response.data;
      //  console.log(this.awesomeConcept)
        this.$scope.cloud = []
        for (var i = 0; i < response.data.length; i++) {
         var a = { text :  response.data[i]["Concept"].name, weight: response.data[i]["total"] , link :"http://"+ this.$window.location.host + "/questions/"+ response.data[i].ConceptId}
         this.$scope.cloud.push(a)
          this.awesomeConceptId[response.data[i]["Concept"]._id] = {name :response.data[i]["Concept"].name, nombre : response.data[i].total }      
        }
        

       // console.log(this.awesomeConceptId)
        if(this.awesomeConceptId[this.$stateParams.id] != undefined){ 
          console.log("on passe dans le if")   
          this.currentConcept = {"ConceptId" : this.$stateParams.id,name : this.awesomeConceptId[this.$stateParams.id]["name"] }
          this.choice = true;
        }
        console.log(this.awesomeConcept)
      });

   
  }



  choix_concept(concept) {

    this.currentConcept =  {ConceptId : concept.Concept._id, name : concept.Concept.name}
    console.log(this.currentConcept)
    this.choice = true;

  }





  addQuestion() {
    console.log(this.currentConcept)

    
    if (this.goodAnswer != "" && this.question != "" && this.WrongAnswer1 != "" && this.WrongAnswer2 != "" && this.WrongAnswer3 != "") {
      console.log("tu as tout rempli génial")
      this.$http.post("/api/questions", {
        question: this.question,
        nbAppearance: 0,
        nbContestation: 0,
        ConceptId: this.currentConcept.ConceptId,
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

      this.goodAnswer ="";
      this.WrongAnswer1 ="";
      this.WrongAnswer2 ="";
      this.WrongAnswer3 = "";
      this.question = "";

      var variable2 = '#required_field';
      var myE2 = angular.element( document.querySelector(variable2) );
      myE2.removeAttr('style');
      myE2.attr('style',"display: none;");

      this.$http.get('/api/badges/'+20)
          .then(response => {
            this.badge = response.data;
            console.log(this.badge);
      });

      try{
        this.putUserAward();
      } catch (e) {
        console.log("Got an error!",e);
      }

      })
    }
    else {

      var variable2 = '#required_field';
      var myE2 = angular.element( document.querySelector( variable2 ) );
      myE2.removeAttr('style');
      myE2.attr('style',"display: inline;");

      var variable2 = '#badge-award';
      var myE2 = angular.element( document.querySelector( variable2 ) );
      myE2.removeAttr('style');
      myE2.attr('style',"display: none;");

    }
    console.log(this.message)
  }


  showButtonHandler() {

    if(this.showme == true) {
      this.showme = false;
    } else {
      this.showme = true;
    }

    if(this.showus == true) {
      this.showus = false;
    } else {
      this.showus = true;
    }
    
  }
/*
        putUserAward(){
          
          this.$http.get('/api/awards/user/badge/'+ 20)
          .then(response => {

            this.detailAwards = response.data;

            console.log("c est la base");
            console.log(this.detailAwards)

            if(this.detailAwards.length == 0){
              console.log("on creait")

              this.$http.post("/api/awards/create/", {
                BadgeId : 20,
                badgeCount : 1
              });

            } else {
              console.log("on modifie ")
              console.log(this.detailAwards)
              var badgeC = this.detailAwards[0].badgeCount + 1;

              this.$http.put("/api/awards/user.badge/"+ 20, {
                badgeCount : badgeC,
                _id: 20
              });

              this.$scope.badgeExistes = true;
            }

          });
                    
        }*/

          putUserAward(){
            
            this.$http.get('/api/awards/user/badge/'+ 20)
            .then(response => {

              
              console.log(response)
                console.log("on modifie ")

                if ( response.data.badgeCount == 4 ||  response.data.badgeCount == 9 || response.data.badgeCount == 14 || response.data.badgeCount == 19 || response.data.badgeCount == 24) {
                  var variable2 = '#badge-award';
                  var myE2 = angular.element( document.querySelector( variable2 ) );
                  myE2.removeAttr('style');
                  myE2.attr('style',"display: inline;");
                }

                this.$http.put("/api/awards/"+response.data._id, {
                  badgeCount : response.data.badgeCount + 1,
                  _id: response.data._id
                });

            
              
              },response =>{

                console.log("echec")

                var variable2 = '#badge-award';
                var myE2 = angular.element( document.querySelector( variable2 ) );
                myE2.removeAttr('style');
                myE2.attr('style',"display: inline;");
                
                this.$http.post("/api/awards/create/", {
                  BadgeId : 20,
                  badgeCount : 1,
                  date: new Date(),
                });

                

              });
                      
            }
  

}


export default angular.module('skillGameApp.questions', [uiRouter])
  .config(routing)
  .component('questions', {
    template: require('./questions.html'),
    controller: QuestionsController
  })
.name;