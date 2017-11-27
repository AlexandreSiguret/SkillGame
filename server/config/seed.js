/**

 * Populate DB with sample data on server start

 * to disable, edit config/environment/index.js, and set `seedDB: false`

 */



'use strict';

import sqldb from '../sqldb';

import config from './environment/';



export default function seedDatabaseIfNeeded() {

  if (config.seedDB) {

    let Thing = sqldb.Thing;
    let User = sqldb.User;
    let Concept = sqldb.Concept;
    let Question = sqldb.Question;
    let Choice = sqldb.Choice;
    let Game = sqldb.Score;
    let Score = sqldb.Game;
    let Answer = sqldb.Answer
    let Message = sqldb.Message;
    let Badge = sqldb.Badge

    Answer.destroy({where : {}})
    .then(console.log("réponse détruire"))
    Message.destroy({where:{}})
    .then(() =>{
      let message = Message.bulkCreate([{

        expediteur : "antonio@antonio.com",
        destinataire : "htsa@htsa.com",
        msg_type : 1,
        message : 'Salut',
        _id: 1
      }, {
         expediteur : "htsa@htsa.com",
         destinataire : "antonio@antonio.com",
         msg_type : 1,
         message : 'Salut cava?',
         _id: 2
      }, {
        expediteur : "antonio@antonio.com",
        destinataire : "htsa@htsa.com",
        msg_type : 1,
        message : 'Cava bien ..... !',
        _id: 3
     }
    ])
    } )
    .then(() => console.log('finished populating message things'))
    
    .catch(err => console.log('error populating message things', err));



    Concept.destroy({ where: {} })

      .then(() => {

        let concept = Concept.bulkCreate([{

          name: 'Computer sciences',

          _id: 1

        }, {

          name: 'Iphone X',

          _id: 2

        }, {

          name: 'Judo',

          _id: 3

        }, {

          name: 'Art',

          _id: 4



        }]);

      })

      .then(() => console.log('finished populating things'))

      .catch(err => console.log('error populating things', err));



    User.destroy({ where: {} })

      .then(() => User.bulkCreate([{

        provider: 'local',

        name: 'Test User',

        avatar: 'anonyme.png',

        email: 'test@example.com',

        password: 'test',

        _id: 1

      }, {

        _id: 2,

        provider: 'local',

        role: 'admin',

        name: 'Admin',

        avatar: 'anonyme.png',

        email: 'admin@example.com',

        password: 'admin'

      },

      {

        _id: 3,

        provider: "local",

        name: "Alexandre",

        avatar: 'alexandre.jpg',

        email: "alexandre@alexandre.com",

        password: "alexandre",

      },

      {

        _id: 4,

        provider: "local",

        name: "Mohamed",

        avatar: 'mohamed.jpg',

        email: "mohamed@mohamed.com",

        password: "mohamed",

      },

      {

        _id: 5,

        provider: "local",

        name: "Antonio",

        avatar: 'antonio.jpg',

        email: "antonio@antonio.com",

        password: "antonio",

      },

      {

        _id: 6,

        provider: "local",

        name: "Yassine",

        avatar: 'yassine.jpg',

        email: "yassine@yassine.com",

        password: "yassine",

      },

      {

        _id: 7,

        provider: "local",

        name: "HTSA",

        avatar: 'htsa.jpg',

        role: 'admin',

        email: "htsa@htsa.com",

        password: "htsa",

      },

      {

        _id: 8,

        provider: "local",

        name: "David",

        avatar: 'anonyme.png',

        role: 'admin',

        email: "david@david.com",

        password: "david",

      }



      ])

        .then(() => console.log('finished populating users'))

        .catch(err => console.log('error populating users', err)));





    Question.destroy({ where: {} })

      .then(() => {

        let concept = Question.bulkCreate([{

          _id: 1,

          owner: 7,

          question : "lequel de ces noms n'est pas celui d'un OS Linux ? ",

          nbAppearance: 10,

          nbContestation: 2,

          ConceptId: 1,

          goodAnswer: "Captain",

        },

        {

          _id: 2,

          owner: 7,

          question : "Quelle est la premiere version de windows",

          nbAppearance: 10,

          nbContestation: 3,

          ConceptId: 1,

          goodAnswer: "Windows 1.0",

        },

        {

          _id: 3,

          owner: 8,

          question : "Date d'invention de la machine de Turring ?",

          nbAppearance: 15,

          nbContestation: 3,

          ConceptId: 1,

          goodAnswer: "1936",

        },

        {

          _id: 4,

          owner: 3,

          question : "Qui est l'auteur du duo des chats ?",

          nbAppearance: 50,

          nbContestation: 2,

          ConceptId: 4,

          goodAnswer: "Rossini",

        },

        {

          _id: 5,

          owner: 6,

          question : "Qui a dessine la statue de la liberte",

          nbAppearance: 25,

          nbContestation: 10,

          ConceptId: 4,

          goodAnswer: "Auguste Bartholdi",

        },

        {

          _id: 6,

          owner: 7,

          question : "Quel est l'instrument de Chopin",

          nbAppearance: 50,

          nbContestation: 2,

          ConceptId: 4,

          goodAnswer: "piano",

        },

        {

          _id: 7,

          owner: 8,

          question : "Qui est le peintre de la Joconde",

          nbAppearance: 55,

          nbContestation: 15,

          ConceptId: 4,

          goodAnswer: "Leonard de vinci",

        },



        ]);





      })



      .then(() => console.log('finished question'))

      

    Choice.destroy({ where: {} })

      .then(() => {

        let concept = Choice.bulkCreate([{



          _id: 1,

          QuestionId : 1,

          statement: "Fedora"

        },

        {



          _id: 2,

          QuestionId : 1,

          statement: "Captain"

        },

        {



          _id: 3,

          QuestionId : 1,

          statement: "Ubuntu"

        },

        {



          _id: 4,

          QuestionId : 1,

          statement: "Debian"

        },

        {



          _id: 5,

          QuestionId : 2,

          statement: "Windows 1.0"

        },

        {



          _id: 6,

          QuestionId : 2,

          statement: "Windows 3"

        },

        {



          _id: 7,

          QuestionId : 2,

          statement: "Windows"

        },

        {



          _id: 8,

          QuestionId : 2,

          statement: "Windows xp"

        },

        {



          _id: 9,

          QuestionId : 3,

          statement: "1936"

        },

        {



          _id: 10,

          QuestionId : 3,

          statement: "1943"

        },

        {



          _id: 11,

          QuestionId : 3,

          statement: "2011"

        },
        {
          _id: 12,
          QuestionId : 3,
          statement : "2000"
        },

        {



          _id: 13,

          QuestionId : 3,

          statement: "Carl Orff"

        },

        {



          _id: 14,

          QuestionId : 4,

          statement: "Mozart"

        },

        {



          _id: 15,

          QuestionId : 4,

          statement: "Rossini"

        },

        {



          _id: 16,

          QuestionId : 4,

          statement: "Beethoven"

        },
        {
          _id : 17,
          QuestionId :5,
          statement :"Gustave Eiffel "
        }
        ,
        {
          _id:18,
          QuestionId :5,
          statement :"Auguste Bartholdi"
        },
        {
          _id:19,
          QuestionId :5,
          statement :"Le Corbusier"
        },
        {
          _id:20,
          QuestionId :5,
          statement :"Ted Mosby"
        },
        {
         _id:21,
         QuestionId :6,
         statement: "piano"
        },
        {
          _id:22,
          QuestionId :6,
          statement: "flûte"
         },
         {
          _id:23,
          QuestionId :6,
          statement: "triangle"
         },
         {
          _id:24,
          QuestionId :6,
          statement: " violoncelle"
         },
         {
          _id:25,
          QuestionId :7,
          statement:"Leonardo Dicaprio"
         },
         {
          _id:26,
          QuestionId :7,
          statement:"Leonard de vinci"
         },
         {
          _id:27,
          QuestionId :7,
          statement:"Leonardo la tortue ninja"
         },
         {
          _id:28,
          QuestionId :7,
          statement:"Leonard Cohen"
         },
                ]);

      })

      .then(() => console.log('finished populating things'))

      .catch(err => console.log('error populating things', err));

      
      Badge.destroy({ where: {} })
      
            .then(() => {
      
              let badge = Badge.bulkCreate([{
      
                picture: 'gegqsdgrgrgrg',
                description : 'expert Computeur science',      
                _id: 1
      
              }, {
      
                picture: 'gegqsdgrgrgrg',
                description : 'expert iphoneX',      
                _id: 2
              }, {
      
                picture: 'gegqsdgrgrgrg',
                description : 'expert Judo',      
                _id: 3
      
              }, {
      
                picture: 'gegqsdgrgrgrg',
                description : 'expert Art',      
                _id: 4     
      
      
              }]);
      
            })
      
            .then(() => console.log('finished populating badges'))
      
            .catch(err => console.log('error populating badges', err));


      Game.destroy({where:{}})
      .then(() =>{
        let game = Game.bulkCreate([{
  
          UserId : 7,
          //User2bisId:1,
          ConceptId : 1,
          ended : false
  
  
        }, {
           UserId : 7,
           User2Id : 8,
           ConceptId : 1,
           ended : false
        }
      ])
      } )
      .then(() => console.log('finished populating things'))
      
      .catch(err => console.log('error populating things', err));


      Score.destroy({where:{}})
      .then(() =>{
        let score = Score.bulkCreate([{
  
          User1Id : 7,
          ConceptId : 1,
          score : 0
  
  
        }, {
           User1Id : 7,
           ConceptId : 1,
           score : 0
        }
      ])
      } )
      .then(() => console.log('finished populating scores'))
      
      .catch(err => console.log('error populating scores', err));

  }

}