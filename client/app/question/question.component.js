import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './question.routes';

export class QuestionController {
  $scope;
  $http;
  $timeout
  socket;
  stopped;
  getCurrentUser : Function;

  
  /*@ngInject*/
  constructor($http, $scope, socket, $timeout,$stateParams, Auth,$rootScope,dialogs) {
    this.$timeout=$timeout;
    this.$scope=$scope;
    this.$stateParams = $stateParams;
    this.$http = $http;
    this.socket = socket;
    $scope.counter = 30;
    $scope.stopped = false;
    this.errormessage = ""
    this.questionChoices=[];
    this.singleQuestion=[];
    this.idChoices = [];
    this.num = 0;
    this.concept;
    this.currentScore = 0;
    this.getCurrentUser = Auth.getCurrentUserSync;
    this.listAwards = [];
    this.correctanswernumber=0;
    
    $scope.launch = function() {
          dialogs.notify('Congrats','U won the Bronze Medal');
          //this.$scope.launch();
    }; // end launch
    this.detailAwards = [];


    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('question');
    });

    $scope.onTimeout = function(){

      if($scope.counter == 0) {

        
        
        var variable = '#label-choices-'+this.detailedQuestion._id;
        var myEl = angular.element( document.querySelector( variable ) );
        myEl.removeAttr('class');
        myEl.attr('class',"false");

      
        
        for (var i = 0; i < this.idChoices.length; i++) {
          var variable = '#choices-'+this.idChoices[i];
          var myEl = angular.element( document.querySelector( variable ) );
          myEl.attr('disabled',"");
        }

        if(this.num < 1)
        {
          var myEl = angular.element(document.querySelector('#next-question-button'));
          myEl.removeAttr('disabled');

          var myEl = angular.element(document.querySelector('#report-question-button'));
          myEl.removeAttr('disabled');
        }       

        
       
        $scope.stopped=true;

        this.$http.put('/api/answers/'+ this.singleQuestion._id,{
          _id :this.singleQuestion._id,
          earnedPoint : 0
        })
      }

      if($scope.stopped != true)
        {$scope.counter--;}

      $scope.minutes = Math.floor((($scope.counter / 60)));
      $scope.seconds = Math.floor($scope.counter - ($scope.minutes * 60));
      mytimeout = $timeout($scope.onTimeout,1000);
    }
    var mytimeout = $timeout($scope.onTimeout,1000);
  }

  $onInit() {
    this.call_question();
  }

  call_question() {

    this.$http.get('/api/answers/pickone/'+this.$stateParams.game_id)
    .then(response => {
      this.singleQuestion = response.data[0];

    /* Concept Ilimination */
	  
	  this.$http.get("/api/questions/"+response.data[0].Question._id)
      .then(response => {
        this.concept = response.data.ConceptId; 
    
      });
	  
      this.$http.get("/api/choices/question/"+this.singleQuestion.Question._id)
      .then(response => {
        this.questionChoices = response.data;

      });

      /* !!! !!! */
      this.$http.get("/api/questions/"+this.singleQuestion.Question._id)
      .then(response => {
        this.detailedQuestion = response.data;

          for (var i = 0; i < 4; i++) {
            this.idChoices[i]=this.questionChoices[i]._id;

            if (this.questionChoices[i].statement == this.detailedQuestion.goodAnswer)
              this.detailedQuestion._id = this.questionChoices[i]._id;
          }

      });
    });
  }
  

  Check_next() {
    this.errormessage = "";
    var myEl = angular.element(document.querySelector('#next-question-button'));
    myEl.attr('disabled',"");

    var myEl = angular.element(document.querySelector('#report-question-button'));
    myEl.attr('disabled',"");  

    this.call_question() 


    this.num++;
    this.$scope.counter = 30;
    this.$scope.stopped=false;

  }

  report(){
          // alert('Question Reported !');
          if(this.errormessage ==""){
            
           
            this.errormessage = "the question has been reported"
            this.$http.get("/api/questions/"+this.singleQuestion.Question._id).then(response =>{ 
              this.$http.put("/api/questions/"+this.singleQuestion.Question._id,{ 
                _id : this.singleQuestion.Question._id,
                nbContestation : response.data.nbContestation + 1 
              })
            })
          }
        }

        getUserAwards(){
          this.$http.get('/api/awards/'+this.getCurrentUser()._id)
          .then(response => {
            this.listAwards = response.data;
            this.socket.syncUpdates('award', this.listAwards);
            console.log(this.listAwards._id);
          });
          
        }

       existUserBadge(uId,cId,bId){
          this.$http.get('/api/awards/'+uId+'/'+cId+'/'+bId)
          .then(response => {
            this.detailAwards = response.data;
            console.log(response.status, response.data.length);
          });
          if(this.detailAwards.length === 0) {
            console.log("logitud 0 ?");
            return false;
          }
          else if(this.detailAwards[0]._id > 0){
            console.log(this.detailAwards[0]._id);
            return true;
          }

        }
        
        putUserAward(){
          var aa = this.existUserBadge(this.getCurrentUser()._id, this.concept, 3 );
          console.log('existe ? : '+aa+' para : '+this.getCurrentUser()._id+'/'+this.concept+'/'+ 3 );
          if(!aa){
              this.$http.post("/api/awards", {
                UserId : this.getCurrentUser()._id,
                ConceptId : this.concept,
                BadgeId : 3,
                badgeCount : 1,
                date: new Date(),
              });
              
            }else{
              this.$http.put("/api/awards/"+this.detailAwards[0]._id, {
                badgeCount : this.detailAwards[0].badgeCount + 1,
                _id: this.detailAwards[0]._id
              });
            }
          }
        
        // ajout modal winning award
        validation(select){
          console.log("on appele validation")
          if ( this.detailedQuestion.goodAnswer == select.statement ) {

            this.correctanswernumber++;

            this.$http.put('/api/answers/'+ this.singleQuestion._id,{
              _id :this.singleQuestion._id,
              earnedPoint : this.$scope.seconds
            })
            console.log("on va appeler score")
		      	this.$http.get("/api/scores/"+this.concept) 
            .then(response => {                             
              console.log("reussi") 
              .then(response => {
                this.idNewScore = response.data._id;
              });
              this.currentScore = response.data.score;              
              this.$http.put('/api/scores/'+ response.data._id,{
                score : this.currentScore + this.$scope.seconds,
                ConceptId : this.concept,
                _id :response.data._id
              });

              
            },response => {
                console.log("echec")
                this.$http.post('/api/scores',{
                score :  this.$scope.seconds,              
                ConceptId : this.concept
                })
              console.log("on s'active")
              }
            )
            
			
            var variable = '#label-choices-'+select._id;
            var myEl = angular.element( document.querySelector( variable ) );
            myEl.removeAttr('class');
            myEl.attr('class',"true");

            for (var i = 0; i < this.idChoices.length; i++) {
              var variable = '#choices-'+this.idChoices[i];
              var myEl = angular.element( document.querySelector( variable ) ); 
              myEl.attr('disabled',"");
            }
          }
          else {
           

            this.$http.put('/api/answers/'+ this.singleQuestion._id,{ 
              _id :this.singleQuestion._id,
              earnedPoint : 0
            })

            var variable = '#label-choices-'+this.detailedQuestion._id;
            var myEl = angular.element( document.querySelector( variable ) );
            myEl.removeAttr('class');
            myEl.attr('class',"true");

            var variable2 = '#label-choices-'+select._id;
            var myE2 = angular.element( document.querySelector( variable2 ) );
            myE2.removeAttr('class');
            myE2.attr('class',"false");

            for (var i = 0; i < this.idChoices.length; i++) {
              var variable = '#choices-'+this.idChoices[i];
              var myEl = angular.element( document.querySelector( variable ) );
              myEl.attr('disabled',"");
            } 

          }

          if(this.num < 1) {
            var myEl = angular.element(document.querySelector('#next-question-button'));
            myEl.removeAttr('disabled');
            var myEl = angular.element(document.querySelector('#report-question-button'));
            myEl.removeAttr('disabled');
          }
          else {
            /* Badge && Award Winner */
            if (this.correctanswernumber == 2)
            {
              //this.$scope.launch();
              this.putUserAward();
              this.getUserAwards();

              var variable2 = '#badge-award';
              var myE2 = angular.element( document.querySelector( variable2 ) );
              myEl.removeAttr('style');
              myE2.attr('style',"display: inline;");
      
            }
            
            this.$timeout(function() {  

              //var variable2 = '#quiz';
              //var myE2 = angular.element( document.querySelector( variable2 ) );
              //myE2.attr('style',"display: none;");
              
            var myEl = angular.element(document.querySelector('#report-question-button'));
            myEl.removeAttr('disabled');

              var variable2 = '#quiz-resulats';
              var myE2 = angular.element( document.querySelector( variable2 ) );
              myEl.removeAttr('style');
              myE2.attr('style',"display: inline;");

              //vm.$scope.launch();

              //alert('Hello');
            //this.valeur=true;/*alert('Test Terminer !! Redirection vers la page ..... !!');*/

          }, 2000);
          }
          this.$scope.stopped=true;
        }
      }

      export default angular.module('skillGameApp.question', [uiRouter])
      .config(routing)
      .component('question', {
        template: require('./question.html'),
        controller: QuestionController
      })
.name;