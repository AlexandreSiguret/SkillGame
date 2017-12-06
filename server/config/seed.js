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
    let Game = sqldb.Game;
    let Score = sqldb.Score;
    let Alonescore = sqldb.Alonescore;
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
        date : 1256,
        message : 'Salut',
        _id: 1
      }, {
         expediteur : "htsa@htsa.com",
         destinataire : "antonio@antonio.com",
         msg_type : 1,
         date : 1258,
         message : 'Salut cava?',
         _id: 2
      }, {
        expediteur : "antonio@antonio.com",
        destinataire : "htsa@htsa.com",
        msg_type : 1,
        date : 1280,
        message : 'Cava bien ..... !',
        _id: 3
     }, {
      expediteur : "antonio@antonio.com",
      destinataire : "yassine@yassine.com",
      msg_type : 1,
      date : 1256,
      message : 'Salut',
      _id: 4
    }, {
       expediteur : "yassine@yassine.com",
       destinataire : "antonio@antonio.com",
       msg_type : 1,
       date : 1258,
       message : 'Salut cava?',
       _id: 5
    }, {
      expediteur : "antonio@antonio.com",
      destinataire : "yassine@yassine.com",
      msg_type : 1,
      date : 1280,
      message : 'Cava bien ..... !',
      _id: 6
     },{
      expediteur : "antonio@antonio.com",
      destinataire : "mohamed@mohamed.com",
      msg_type : 1,
      date : 1256,
      message : 'Salut',
      _id: 7
    }, {
       expediteur : "mohamed@mohamed.com",
       destinataire : "antonio@antonio.com",
       msg_type : 1,
       date : 1258,
       message : 'Salut cava?',
       _id: 8
    }, {
      expediteur : "antonio@antonio.com",
      destinataire : "mohamed@mohamed.com",
      msg_type : 1,
      date : 1280,
      message : 'Cava bien ..... !',
      _id: 9
    },{
      expediteur : "antonio@antonio.com",
      destinataire : "alexandre@alexandre.com",
      msg_type : 1,
      date : 1256,
      message : 'Salut',
      _id: 10
    }, {
       expediteur : "alexandre@alexandre.com",
       destinataire : "antonio@antonio.com",
       msg_type : 1,
       date : 1258,
       message : 'Salut cava?',
       _id: 11
    }, {
      expediteur : "antonio@antonio.com",
      destinataire : "alexandre@alexandre.com",
      msg_type : 1,
      date : 1280,
      message : 'Cava bien ..... !',
      _id: 12
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
        },{
          name: 'Animal',
          _id:5
        },{
          name: 'Biology',
          _id:6
        },{
          name: 'Birds',
          _id:7
        },{
          name: 'Earth',
          _id:8
        },{
          name: 'Computer',
          _id:9
        },{
          name: 'World',
          _id:10
        },{
          name: 'Sport',
          _id:11
        },{
          name: 'Space',
          _id:12
        },{
          name: 'Science',
          _id:13
        },{
          name: 'Music',
          _id:14
        },{
          name: 'Harry Potter',
          _id:15
        },{
          name: 'France',
          _id:16
        }
        ]);

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

        },{

          _id: 8,

          owner: 8,

          question : "The llama is a domesticated camelid that is native to which continent?",

          nbAppearance: 5,

          nbContestation: 1,

          ConceptId: 5,

          goodAnswer: "South America",

        }, {
          _id: 9,
          owner: 8,
          question :"A panda's daily diet consists almost entirely of what plant?",
          nbAppearance: 5,
          nbContestation: 1,
          ConceptId: 5,
          goodAnswer:"Bamboo"
        },{
          _id: 10,
          owner: 8,
          question :"What is the largest species of terrestrial crab in the world?",
          nbAppearance: 5,
          nbContestation: 1,
          ConceptId: 5,
          goodAnswer:"The coconut crab"
        },{
          _id: 11,
          owner: 8,
          question :"Cynophobia is the fear of what kind of animal?",
          nbAppearance: 5,
          nbContestation: 1,
          ConceptId: 5, 
          goodAnswer:"Dogs"
        },{
          _id: 12,
          owner: 8,
          question :"The Van Gogh museum is located in what European capital city?",
          nbAppearance: 5,
          nbContestation: 1,
          ConceptId: 4, 
          goodAnswer:"Paris"
        }, {
          _id: 13,
          owner: 8,
          question :"Who painted a late 15th-century mural known as the Last Supper?",
          nbAppearance: 5,
          nbContestation: 1,
          ConceptId: 4,
          goodAnswer:"Leonardo da Vinci"
        }, {
          _id: 14,
          owner: 8,
          question :"Which artist is credited with developing linear perspective?",
          nbAppearance: 5,
          nbContestation: 1,
          ConceptId: 4,
          goodAnswer:"Brunelleschi"
        },{
          _id: 15,
          owner: 8,
          question :"What French sculptor created the Statue of Liberty?",
          nbAppearance: 5,
          nbContestation: 1,
          ConceptId: 4,
          goodAnswer:"Frédéric Auguste Bartholdi"
        },{
          _id: 16,
          owner: 8,
          question :"The molecule hemoglobin is used in which type of cells?",
          nbAppearance: 5,
          nbContestation: 1,
          ConceptId: 6,
          goodAnswer:"Red blood cells"
        },{
          _id: 17,
          owner: 8,
          question :"In humans, what is the only internal organ capable of regenerating lost tissue?",
          nbAppearance: 5,
          nbContestation: 1,
          ConceptId: 6,
          goodAnswer:"The Liver"
        },{
          _id: 18,
          owner: 8,
          question :"Approximately 2% of all people have what eye color?",
          nbAppearance: 5,
          nbContestation: 1,
          ConceptId: 6,
          goodAnswer:"Green"
        },{
          _id: 19,
          owner: 8,
          question :"What vitamin is produced when a person is exposed to sunlight?",
          nbAppearance: 5,
          nbContestation: 1,
          ConceptId: 6,
          goodAnswer:"Vitamin D"
        },{
          _id: 20,
          owner: 8,
          question :"The Passenger Pigeon, now extinct, was endemic to which continent?",
          nbAppearance: 5,
          nbContestation: 1,
          ConceptId:7,
          goodAnswer:"North America"
        }, {
          _id: 21,
          owner: 8,
          question :"What is the fastest bird in the world when in its hunting dive?",
          nbAppearance: 5,
          nbContestation: 1,
          ConceptId:7,
          goodAnswer:"The Peregrine Falcon"
        }, {
          _id: 22,
          owner: 8,
          question :"Which is the most abundant metal in the earth's crust?",
          nbAppearance: 5,
          nbContestation: 1,
          ConceptId:8,
          goodAnswer:"Aluminum"
        }, {
          _id: 23,
          owner: 8,
          question :"What is the second most abundant element in the earth's atmosphere?",
          nbAppearance: 5,
          nbContestation: 1,
          ConceptId:8,
          goodAnswer:"Oxygen"
        },{
          _id: 24,
          owner: 8,
          question :"What is the world's largest ocean?",
          nbAppearance: 5,
          nbContestation: 1,
          ConceptId:8,
          goodAnswer:"The Pacific Ocean"
        }, {
          _id: 25,
          owner: 8,
          question :"In what month is the Earth closest to the sun?",
          nbAppearance: 5,
          nbContestation: 1,
          ConceptId:8,
          goodAnswer:"January"
        },{
          _id: 26,
          owner: 8,
          question :"In 1975 an engineer created the first electronic camera while working for what company?",
          nbAppearance: 5,
          nbContestation: 1,
          ConceptId:9,
          goodAnswer:"Kodak"
        }, {
          _id: 27,
          owner: 8,
          question :"Nintendo is a consumer electronics and video game company founded in what country?",
          nbAppearance: 5,
          nbContestation: 1,
          ConceptId:9,
          goodAnswer:"Japan"
        },{
          _id: 28,
          owner: 8,
          question :"HTML and CSS are computer languages used to create what?",
          nbAppearance: 5,
          nbContestation: 1,
          ConceptId:9,
          goodAnswer:"Websites"
        }, {
          _id: 29,
          owner: 8,
          question :"The first person shooter video game Doom was first released in what year?",
          nbAppearance: 5,
          nbContestation: 1,
          ConceptId:9,
          goodAnswer:"1993"
        },{
          _id: 30,
          owner: 8,
          question :"What is the tallest building in the world?",
          nbAppearance: 5,
          nbContestation: 1,
          ConceptId:10,
          goodAnswer:"The Burj Khalifa"
        }, {
          _id: 31,
          owner: 8,
          question :"In which sport does the bowler deliver the ball to the batsman?",
          nbAppearance: 5,
          nbContestation: 1,
          ConceptId:10,
          goodAnswer:"Cricket"
        },{
          _id: 32,
          owner: 8,
          question :"What is the official language of the Canadian province Quebec?",
          nbAppearance: 5,
          nbContestation: 1,
          ConceptId:10,
          goodAnswer:"Frensh"
        }, {
          _id: 33,
          owner: 8,
          question :"The lowest natural temperature ever directly recorded at ground level was measured on what Continent?",
          nbAppearance: 5,
          nbContestation: 1,
          ConceptId:10,
          goodAnswer:"Antarctica"
        },{
          _id: 34,
          owner: 8,
          question :"Who was the first golfer to win the Masters Tournament two years in a row?",
          nbAppearance: 5,
          nbContestation: 1,
          ConceptId:11,
          goodAnswer:"Jack Nicklaus"
        }, {
          _id: 35,
          owner: 8,
          question :"Bobby Fischer is considered by many to be the greatest player of all time in which game?",
          nbAppearance: 5,
          nbContestation: 1,
          ConceptId:11,
          goodAnswer:"Chess"
        },{
          _id: 36,
          owner: 8,
          question :"Anthony Jerome Spud Webb retired from what professional sport in 1997?",
          nbAppearance: 5,
          nbContestation: 1,
          ConceptId:11,
          goodAnswer:"Basketball"
        }, {
          _id: 37,
          owner: 8,
          question :"In what year did the Houston Texans join the NFL?",
          nbAppearance: 5,
          nbContestation: 1,
          ConceptId:11,
          goodAnswer:"2002"
        },{
          _id: 38,
          owner: 8,
          question :"Who were there first two astronauts that landed on the moon in 1969?",
          nbAppearance: 5,
          nbContestation: 1,
          ConceptId:12,
          goodAnswer:"Neil Armstrong and Buzz Aldrin"
        }, {
          _id: 39,
          owner: 8,
          question :"The Great Red Spot is a gigantic storm located on which planet in our solar system?",
          nbAppearance: 5,
          nbContestation: 1,
          ConceptId:12,
          goodAnswer:"Jupiter"
        },
 
        {
          _id: 40,
          owner: 8,
          question :"Which planet in our solar system has an axis that is titled by 98 degrees?",
          nbAppearance: 5,
          nbContestation: 1,
          ConceptId:12,
          goodAnswer:"Uranus"
        }, {
          _id: 41,
          owner: 8,
          question :"Ceres is a dwarf planet that lies between the orbits of which two planets in our solar system?",
          nbAppearance: 5,
          nbContestation: 1,
          ConceptId:12,
          goodAnswer:"Mars & Jupiter"
        },{
          _id: 42,
          owner: 8,
          question :"In the United States and Canada, one ton is a unit of measure that contains how many pounds?",
          nbAppearance: 5,
          nbContestation: 1,
          ConceptId:13,
          goodAnswer:"2000"
        }, {
          _id: 43,
          owner: 8,
          question :"Penicillin was discovered in 1928 by which Scottish scientist?",
          nbAppearance: 5,
          nbContestation: 1,
          ConceptId:13,
          goodAnswer:"Sir Alexander Fleming"
        },
 
        {
          _id: 44,
          owner: 8,
          question :"SpaceX was founded by what South African-born inventor?",
          nbAppearance: 5,
          nbContestation: 1,
          ConceptId:13,
          goodAnswer:"Elon Musk"
        }, {
          _id: 45,
          owner: 8,
          question :"186,282 miles per second is the speed of what in a vacuum?",
          nbAppearance: 5,
          nbContestation: 1,
          ConceptId:13,
          goodAnswer:"Light"
        },{
          _id: 46,
          owner: 8,
          question :"Which planet in our solar system has an axis that is titled by 98 degrees?",
          nbAppearance: 5,
          nbContestation: 1,
          ConceptId:13,
          goodAnswer:"Uranus"
        }, {
          _id: 47,
          owner: 8,
          question :"What is the name for the unit of measurement of power that is roughly equal to 746 watts?",
          nbAppearance: 5,
          nbContestation: 1,
          ConceptId:13,
          goodAnswer:"Horsepower"
        },
 
        {
          _id: 48,
          owner: 8,
          question :"Which American inventor is generally given credit for the invention of the lightning rod?",
          nbAppearance: 5,
          nbContestation: 1,
          ConceptId:13,
          goodAnswer:"Benjamin Franklin"
        }, {
          _id: 49,
          owner: 8,
          question :"Who developed and patented the electrical telegraph in the United States in 1837?",
          nbAppearance: 5,
          nbContestation: 1,
          ConceptId:13,
          goodAnswer:"Samuel Morse"
        },{
          _id: 50,
          owner: 8,
          question :"How old was American musician Jimi Hendrix when he passed away in 1970?",
          nbAppearance: 5,
          nbContestation: 1,
          ConceptId:14,
          goodAnswer:"27"
        }, {
          _id: 51,
          owner: 8,
          question :"What was the name of the Eminem single that set the world's record in 2013 for the most words used in a song?",
          nbAppearance: 5,
          nbContestation: 1,
          ConceptId:14,
          goodAnswer:"Rap God"
        },
 
        {
          _id: 52,
          owner: 8,
          question :"Released in 1992, what is the best selling soundtrack album of all time?",
          nbAppearance: 5,
          nbContestation: 1,
          ConceptId:14,
          goodAnswer:"The Bodyguard"
        }, {
          _id: 53,
          owner: 8,
          question :"Who played lead guitar for the British rock band Queen?",
          nbAppearance: 5,
          nbContestation: 1,
          ConceptId:14,
          goodAnswer:"Brian May"
        },{
          _id: 54,
          owner: 8,
          question :"What is the name of the actress who plays Hermione Granger in the Harry Potter series of films?",
          nbAppearance: 5,
          nbContestation: 1,
          ConceptId:15,
          goodAnswer:"Emma Watson"
        }, {
          _id: 55,
          owner: 8,
          question :"What is not a house at Hogwarts School of Witchcraft and Wizardry?",
          nbAppearance: 5,
          nbContestation: 1,
          ConceptId:15,
          goodAnswer:"Salavaris"
        },
 
        {
          _id: 56,
          owner: 8,
          question :"In what year was the first Harry Potter movie released?",
          nbAppearance: 5,
          nbContestation: 1,
          ConceptId:15,
          goodAnswer:"2000"
        }, {
          _id: 57,
          owner: 8,
          question :"Who is the former drummer for Nirvana that went on to become the frontman for the Foo Fighters?",
          nbAppearance: 5,
          nbContestation: 1,
          ConceptId:15,
          goodAnswer:"David Grohl"
        },{
          _id: 58,
          owner: 8,
          question :"What is the meaning of the French expression c'est la vie?",
          nbAppearance: 5,
          nbContestation: 1,
          ConceptId:16,
          goodAnswer:"That's life"
        }, {
          _id: 59,
          owner: 8,
          question :"The Statue of Liberty was a gift to the United States from which country?",
          nbAppearance: 5,
          nbContestation: 1,
          ConceptId:16,
          goodAnswer:"France"
        },
 
        {
          _id: 60,
          owner: 8,
          question :"In what year did the French revolution begin?",
          nbAppearance: 5,
          nbContestation: 1,
          ConceptId:16,
          goodAnswer:"1789"
        }, {
          _id: 61,
          owner: 8,
          question :"The phrase Let them eat cake is commonly attributed to whom?",
          nbAppearance: 5,
          nbContestation: 1,
          ConceptId:16,
          goodAnswer:"Marie Antoinette"
        }
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

          QuestionId : 4,

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
         {
          _id:29,
          QuestionId :8,
          statement:"South America"
         },
         {
          _id:30,
          QuestionId :8,
          statement:"North Africa"
         },{
          _id:31,
          QuestionId :8,
          statement:"North America"
         },{
          _id: 32,
          QuestionId :8,
          statement:"Australia"
         },
         {
          _id:33,
          QuestionId :9,
          statement:"Bamboo"
         },{
          _id:34,
          QuestionId :9,
          statement:"Apple"
         },{
          _id:35,
          QuestionId :9,
          statement:"Grasse"
         },{
          _id: 36,
          QuestionId :9,
          statement:"Palm trees"
        },{
          _id:37,
          QuestionId :10,
          statement:"The coconut crab"
         },{
          _id:38,
          QuestionId :10,
          statement:"Fiddler crab"
         },{
          _id:39,
          QuestionId :10,
          statement:"Grapsidae crab"
         },{
          _id: 40,
          QuestionId :10,
          statement:"Frog crab"
         },{
          _id:41,
          QuestionId :11,
          statement:"Dogs"
         },{
          _id:42,
          QuestionId :11,
          statement:"Cats"
         },{
          _id:43,
          QuestionId :11,
          statement:"Insects"
         },{
          _id: 44,
          QuestionId :11,
          statement:"Birds"
         },{
          _id:45,
          QuestionId :12,
          statement:"Paris"
         },{
          _id:46,
          QuestionId :12,
          statement:"Milan"
         },{
          _id:47,
          QuestionId :12,
          statement:"Amsterdam"
         },{
          _id: 48,
          QuestionId :12,
          statement:"Madrid"
         },{
          _id:49,
          QuestionId :13,
          statement:"Leonardo da Vinci"
         },{
          _id:50,
          QuestionId :13,
          statement:"Vincent van Gogh"
         },{
          _id:51,
          QuestionId :13,
          statement:"Pablo Picasso"
         },{
          _id: 52,
          QuestionId :13,
          statement:"Henri Matisse"
         },{
          _id:53,
          QuestionId :14,
          statement:"Brunelleschi"
         },{
          _id:54,
          QuestionId :14,
          statement:"Claude Monet"
         },{
          _id:55,
          QuestionId :14,
          statement:"Donatello"
         },{
          _id: 56,
          QuestionId :14,
          statement:"Masaccio"
         },{
          _id:57,
          QuestionId :15,
          statement:"Frédéric Auguste Bartholdi"
         },{
          _id:58,
          QuestionId :15,
          statement:"Gustave Eiffel"
         },{
          _id:59,
          QuestionId :15,
          statement:"Richard Morris Hunt"
         },{
          _id: 60,
          QuestionId :15,
          statement:"Maurice Koechlin"
         },{
          _id:61,
          QuestionId :16,
          statement:"Red blood cells"
         },{
          _id:62,
          QuestionId :16,
          statement:"white blood cells"
         },{
          _id:63,
          QuestionId :16,
          statement:"nerve cells"
         },{
          _id: 64,
          QuestionId :16,
          statement:"skin cells"
         },{
          _id:65,
          QuestionId :17,
          statement:"The Liver"
         },{
          _id:66,
          QuestionId :17,
          statement:"The heart"
         },{
          _id:67,
          QuestionId :17,
          statement:"The kidney"
         },{
          _id: 68,
          QuestionId :17,
          statement:"The brain"
         },{
          _id:69,
          QuestionId :18,
          statement:"Green"
         },{
          _id:70,
          QuestionId :18,
          statement:"Blue"
         },{
          _id:71,
          QuestionId :18,
          statement:"Black"
         },{
          _id: 72,
          QuestionId :18,
          statement:"Brown"
         },{
          _id:73,
          QuestionId :19,
          statement:"Vitamin D"
         },{
          _id:74,
          QuestionId :19,
          statement:"Vitamin A"
         },{
          _id : 75,
          QuestionId :19,
          statement:"Vitamin B"
         },{
          _id: 76,
          QuestionId :19,
          statement:"Vitamin C"
         },{
          _id:77,
          QuestionId :20,
          statement:"North America"
         },{
          _id:78,
          QuestionId :20,
          statement:"South America"
         },{
          _id:79,
          QuestionId :20,
          statement:"North Africa"
         },{
          _id: 80,
          QuestionId :20,
          statement:"Australia"
         },{
          _id:81,
          QuestionId :21,
          statement:"The Peregrine Falcon"
         },{
          _id:82,
          QuestionId :21,
          statement:"Owl"
         },{
          _id:83,
          QuestionId :21,
          statement:"Parrot"
         },{
          _id: 84,
          QuestionId :21,
          statement:"Flamingo"
         },{ 
          _id:85,
          QuestionId :22,
          statement:"Aluminum"
         },{
          _id:86,
          QuestionId :22,
          statement:"Steel"
         },{
          _id:87,
          QuestionId :22,
          statement:"Zink"
         },{
          _id: 88,
          QuestionId :22,
          statement:"Titanium"
         },{
          _id:89,
          QuestionId :23,
          statement:"Oxygen"
         },{
          _id:90,
          QuestionId :23,
          statement:"Hydrogen"
         },{
          _id:91,
          QuestionId :23,
          statement:"Carbon"
         },{
          _id: 92,
          QuestionId :23,
          statement:"Chlorine"
         }, { 
          _id:93,
          QuestionId :24,
          statement:"The Pacific Ocean"
         },{
          _id:94,
          QuestionId :24,
          statement:"Atlantic Ocean"
         },{
          _id:95,
          QuestionId :24,
          statement:"Indian Ocean"
         },{
          _id: 96,
          QuestionId :24,
          statement:"Mariana Trench"
         },{
          _id:97,
          QuestionId :25,
          statement:"January"
         },{
          _id:98,
          QuestionId :25,
          statement:"May"
         },{
          _id:99,
          QuestionId :25,
          statement:"June"
         },{
          _id: 100,
          QuestionId :25,
          statement:"December"
         },{ 
          _id:101,
          QuestionId :26,
          statement:"Kodak"
         },{
          _id:102,
          QuestionId :26,
          statement:"Sony"
         },{
          _id:103,
          QuestionId :26,
          statement:"IBM"
         },{
          _id: 104,
          QuestionId :26,
          statement:"Canon"
         },{
          _id:105,
          QuestionId :27,
          statement:"Japan"
         },{
          _id:106,
          QuestionId :27,
          statement:"USA"
         },{
          _id:107,
          QuestionId :27,
          statement:"France"
         },{
          _id: 108,
          QuestionId :27,
          statement:"China"
         },{ 
          _id:109,
          QuestionId :28,
          statement:"Websites"
         },{
          _id:110,
          QuestionId :28,
          statement:"Drivers"
         },{
          _id:111,
          QuestionId :28,
          statement:"Desktop Apps"
         },{
          _id: 112,
          QuestionId :28,
          statement:"Operating system"
         },{
          _id:113,
          QuestionId :29,
          statement:"1993"
         },{
          _id:114,
          QuestionId :29,
          statement:"1990"
         },{
          _id:115,
          QuestionId :29,
          statement:"1996"
         },{
          _id: 116,
          QuestionId :29,
          statement:"1987"
         }, { 
          _id:117,
          QuestionId :30,
          statement:"The Burj Khalifa"
         },{
          _id:118,
          QuestionId :30,
          statement:"Eiffel tower"
         },{
          _id:119,
          QuestionId :30,
          statement:"Empire state"
         },{
          _id: 120,
          QuestionId :30,
          statement:"Chrysler Building"
         },{
          _id:121,
          QuestionId :31,
          statement:"Cricket"
         },{
          _id:122,
          QuestionId :31,
          statement:"Hockey"
         },{
          _id:123,
          QuestionId :31,
          statement:"Baseball"
         },{
          _id: 124,
          QuestionId :31,
          statement:"Lacrosse"
         },{ 
          _id:1000,
          QuestionId :32,
          statement:"Frensh"
         },{
          _id:125,
          QuestionId :32,
          statement:"English"
         },{
          _id:126,
          QuestionId :32,
          statement:"Arabic"
         },{
          _id: 127,
          QuestionId :32,
          statement:"Spanish"
         },{
          _id:128,
          QuestionId :33,
          statement:"Antarctica"
         },{
          _id:129,
          QuestionId :33,
          statement:"Asia"
         },{
          _id:130,
          QuestionId :33,
          statement:"America"
         },{
          _id: 131,
          QuestionId :33,
          statement:"Europe"
         },{ 
          _id:132,
          QuestionId :34,
          statement:"Jack Nicklaus"
         },{
          _id:133,
          QuestionId :34,
          statement:"Tiger Woods"
         },{
          _id:134,
          QuestionId :34,
          statement:"Arnold Palmer"
         },{
          _id: 135,
          QuestionId :34,
          statement:"Gary Player"
         },{
          _id:136,
          QuestionId :35,
          statement:"Chess"
         },{
          _id:137,
          QuestionId :35,
          statement:"Football"
         },{
          _id:138,
          QuestionId :35,
          statement:"Basketball"
         },{
          _id: 139,
          QuestionId :35,
          statement:"Tennis"
         },{ 
          _id:140,
          QuestionId :36,
          statement:"Basketball"
         },{
          _id:141,
          QuestionId :36,
          statement:"Football"
         },{
          _id:142,
          QuestionId :36,
          statement:"Volleyball"
         },{
          _id: 143,
          QuestionId :36,
          statement:"HandBall"
         },{
          _id:144,
          QuestionId :37,
          statement:"2002"
         },{
          _id:145,
          QuestionId :37,
          statement:"2000"
         },{
          _id:146,
          QuestionId :37,
          statement:"2004"
         },{
          _id: 147,
          QuestionId :37,
          statement:"2006"
         },{ 
          _id:148,
          QuestionId :38,
          statement:"Neil Armstrong and Buzz Aldrin"
         },{
          _id:149,
          QuestionId :38,
          statement:"James Lovell and William Anders"
         },{
          _id:150,
          QuestionId :38,
          statement:"Bill Pogue and Jack Swigert"
         },{
          _id: 151,
          QuestionId :38,
          statement:"Bruce McCandless and Harrison Schmitt"
         },{
          _id:152,
          QuestionId :39,
          statement:"Jupiter"
         },{
          _id:153,
          QuestionId :39,
          statement:"Earth"
         },{
          _id:154,
          QuestionId :39,
          statement:"Mars"
         },{
          _id: 155,
          QuestionId :39,
          statement:"Neptune"
         },        { 
          _id:156,
          QuestionId :40,
          statement:"Uranus"
         },{
          _id:157,
          QuestionId :40,
          statement:"Jupiter"
         },{
          _id:158,
          QuestionId :40,
          statement:"Mars"
         },{
          _id: 159,
          QuestionId :40,
          statement:"Neptune"
         },{
          _id:160,
          QuestionId :41,
          statement:"Mars & Jupiter"
         },{
          _id:161,
          QuestionId :41,
          statement:"Uranus & Earth"
         },{
          _id:162,
          QuestionId :41,
          statement:"Sturn & Neptune"
         },{
          _id: 163,
          QuestionId :41,
          statement:"Uranus & Mercury"
         },        
        { 
          _id:164,
          QuestionId :42,
          statement:"2000"
         },{
          _id:165,
          QuestionId :42,
          statement:"2"
         },{
          _id:166,
          QuestionId :42,
          statement:"20"
         },{
          _id: 167,
          QuestionId :42,
          statement:"200"
         },{
          _id:168,
          QuestionId :43,
          statement:"Sir Alexander Fleming"
         },{
          _id:169,
          QuestionId :43,
          statement:"Howard Florey"
         },{
          _id:170,
          QuestionId :43,
          statement:"Ernst Boris Chain"
         },{
          _id: 171,
          QuestionId :43,
          statement:"Louis Pasteur"
         },        { 
          _id:172,
          QuestionId :44,
          statement:"Elon Musk"
         },{
          _id:173,
          QuestionId :44,
          statement:"Bill Gates"
         },{
          _id:174,
          QuestionId :44,
          statement:"Mark Zuckerberg"
         },{
          _id: 175,
          QuestionId :44,
          statement:"Tim Cook"
         },{
          _id:176,
          QuestionId :45,
          statement:"Light"
         },{
          _id:177,
          QuestionId :45,
          statement:"Proton"
         },{
          _id:178,
          QuestionId :45,
          statement:"Neutron"
         },{
          _id: 179,
          QuestionId :45,
          statement:"Sound"
         },{ 
          _id:180,
          QuestionId :46,
          statement:"Uranus"
         },{
          _id:181,
          QuestionId :46,
          statement:"Jupiter"
         },{
          _id:182,
          QuestionId :46,
          statement:"Mars"
         },{
          _id: 183,
          QuestionId :46,
          statement:"Neptune"
         },{
          _id:184,
          QuestionId :47,
          statement:"Horsepower"
         },{
          _id:185,
          QuestionId :47,
          statement:"Volt"
         },{
          _id:186,
          QuestionId :47,
          statement:"Ampere"
         },{
          _id: 187,
          QuestionId :47,
          statement:"Tesla"
         },        { 
          _id:188,
          QuestionId :48,
          statement:"Benjamin Franklin"
         },{
          _id:189,
          QuestionId :48,
          statement:"newton"
         },{
          _id:190,
          QuestionId :48,
          statement:"Tesla"
         },{
          _id: 191,
          QuestionId :48,
          statement:"edison"
         },{
          _id:192,
          QuestionId :49,
          statement:"Samuel Morse"
         },{
          _id:193,
          QuestionId :49,
          statement:"Alexander Graham Bell"
         },{
          _id:194,
          QuestionId :49,
          statement:"Eli Whitney"
         },{
          _id: 195,
          QuestionId :49,
          statement:"Guglielmo Marconi"
         },{ 
          _id:196,
          QuestionId :50,
          statement:"27"
         },{
          _id:197,
          QuestionId :50,
          statement:"25"
         },{
          _id:198,
          QuestionId :50,
          statement:"29"
         },{
          _id: 199,
          QuestionId :50,
          statement:"23"
         },{
          _id:200,
          QuestionId :51,
          statement:"Rap God"
         },{
          _id:201,
          QuestionId :51,
          statement:"When We Are Young"
         },{
          _id:202,
          QuestionId :51,
          statement:"Lose Yourself"
         },{
          _id: 203,
          QuestionId :51,
          statement:"When I'am Gone"
         },        { 
          _id:204,
          QuestionId :52,
          statement:"The Bodyguard"
         },{
          _id:205,
          QuestionId :52,
          statement:"Divide"
         },{
          _id:206,
          QuestionId :52,
          statement:"This Is Acting"
         },{
          _id: 207,
          QuestionId :52,
          statement:"Recovery"
         },{
          _id:208,
          QuestionId :53,
          statement:"Brian May"
         },{
          _id:209,
          QuestionId :53,
          statement:"Roger Taylor"
         },{
          _id:210,
          QuestionId :53,
          statement:"Freddie Mercury"
         },{
          _id: 211,
          QuestionId :53,
          statement:"Adam Lambert"
         }, { 
          _id:212,
          QuestionId :54,
          statement:"Emma Watson"
         },{
          _id:213,
          QuestionId :54,
          statement:"Angelina Jolie"
         },{
          _id:214,
          QuestionId :54,
          statement:"Natalie Portman"
         },{
          _id: 215,
          QuestionId :54,
          statement:"Daniel Radcliffe"
         },{
          _id:216,
          QuestionId :55,
          statement:"Salavaris"
         },{
          _id:217,
          QuestionId :55,
          statement:"Gryffindor"
         },{
          _id:218,
          QuestionId :55,
          statement:"Ravenclaw"
         },{
          _id: 219,
          QuestionId :55,
          statement:"Hufflepuff"
         },        { 
          _id:220,
          QuestionId :56,
          statement:"2000"
         },{
          _id:221,
          QuestionId :56,
          statement:"2001"
         },{
          _id:222,
          QuestionId :56,
          statement:"2002"
         },{
          _id: 223,
          QuestionId :56,
          statement:"2003"
         },{
          _id:224,
          QuestionId :57,
          statement:"David Grohl"
         },{
          _id:225,
          QuestionId :57,
          statement:"Kurt Cobain"
         },{
          _id:226,
          QuestionId :57,
          statement:"Alice Cooper"
         },{
          _id: 227,
          QuestionId :57,
          statement:"Krist Novoselic"
         },{ 
          _id:228,
          QuestionId :58,
          statement:"That's life"
         },{
          _id:229,
          QuestionId :58,
          statement:"I love life"
         },{
          _id:230,
          QuestionId :58,
          statement:"Live forever"
         },{
          _id: 231,
          QuestionId :58,
          statement:"Have a good day"
         },{
          _id:232,
          QuestionId :59,
          statement:"France"
         },{
          _id:233,
          QuestionId :59,
          statement:"Italy"
         },{
          _id:234,
          QuestionId :59,
          statement:"Japan"
         },{
          _id: 235,
          QuestionId :59,
          statement:"China"
         },        { 
          _id:236,
          QuestionId :60,
          statement:"1789"
         },{
          _id:237,
          QuestionId :60,
          statement:"1779"
         },{
          _id:238,
          QuestionId :60,
          statement:"1769"
         },{
          _id: 239,
          QuestionId :60,
          statement:"1759"
         },{
          _id:240,
          QuestionId :61,
          statement:"Marie Antoinette"
         },{
          _id:241,
          QuestionId :61,
          statement:"Maria Theresa"
         },{
          _id:242,
          QuestionId :61,
          statement:"Madame du Barry"
         },{
          _id: 243,
          QuestionId :61,
          statement:"Maria Carolina"
         }

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
          
          User1Id : 7,
          //User2bisId:1,
          ConceptId : 1,
          ended : false
  
  
        }, {
           User1Id : 7,
           User2Id : 8,
           ConceptId : 1,
           ended : true

        }]);
      })

     

      .then(() => console.log('finished populating things'))
      
      .catch(err => console.log('error populating things', err));


      Score.destroy({where:{}})
      .then(() =>{
        let score = Score.bulkCreate([{
          
          UserId : 4,
          ConceptId : 1,
          score : 5
  
  
        },{

           UserId : 3,
           ConceptId : 1,
           score : 5
        }, {
          
          UserId : 5,
          ConceptId : 1,
          score : 5
       },{
        
        UserId : 1,
        ConceptId : 1,
        score : 5
     }, {
      
      UserId : 8,
      ConceptId : 1,
      score : 5
    },

    {
      
      UserId : 2,
      ConceptId : 2,
      score : 7
    }
      ]);
      })
      .then(() => console.log('finished score'));


      Alonescore.destroy({where:{}})
      .then(() =>{
        let alonescore = Alonescore.bulkCreate([{
          
          UserId : 4,
          ConceptId : 1,
          alonescore : 5
  
  
        },{

           UserId : 3,
           ConceptId : 1,
           alonescore : 5
        }
      ]);
      })
      .then(() => console.log('finished alonescore'))
      
  }

}