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

        email: 'test@example.com',

        password: 'test',

        _id: 1

      }, {

        _id: 2,

        provider: 'local',

        role: 'admin',

        name: 'Admin',

        email: 'admin@example.com',

        password: 'admin'

      },

      {

        _id: 3,

        provider: "local",

        name: "Alexandre",

        email: "alexandre@alexandre.com",

        password: "alexandre",

      },

      {

        _id: 4,

        provider: "local",

        name: "Momo",

        email: "momo@momo.com",

        password: "momo",

      },

      {

        _id: 5,

        provider: "local",

        name: "anthonio",

        email: "anthonio@anthonio.com",

        password: "anthonio",

      },

      {

        _id: 6,

        provider: "local",

        name: "Yassine",

        email: "yassine@yassine.com",

        password: "yassine",

      },

      {

        _id: 7,

        provider: "local",

        name: "htsa",

        role: 'admin',

        email: "htsa@htsa.com",

        password: "htsa",

      },

      {

        _id: 8,

        provider: "local",

        name: "David",

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

          owner: 3,

          question: "lequel de ces noms n'est pas celui d'un OS Linux ? ",

          nbAppearance: 10,

          nbContestation: 2,

          concept: 1,

          goodAnswer: "Captain",

        },

        {

          _id: 2,

          owner: 7,

          question: "Quelle est la premiere version de windows",

          nbAppearance: 10,

          nbContestation: 3,

          concept: 1,

          goodAnswer: "",

        },

        {

          _id: 3,

          owner: 8,

          question: "Date d'invention de la machine de Turring ?",

          nbAppearance: 15,

          nbContestation: 3,

          concept: 1,

          goodAnswer: "",

        },

        {

          _id: 4,

          owner: 3,

          question: "Qui est l'auteur du duo des chats ?",

          nbAppearance: 50,

          nbContestation: 2,

          concept: 4,

          goodAnswer: "Rossini",

        },

        {

          _id: 5,

          owner: 6,

          question: "Qui a dessine la statue de la liberte",

          nbAppearance: 25,

          nbContestation: 10,

          concept: 4,

          goodAnswer: "",

        },

        {

          _id: 6,

          owner: 7,

          question: "Quel est l'instrument de Chopin",

          nbAppearance: 50,

          nbContestation: 2,

          concept: 4,

          goodAnswer: "",

        },

        {

          _id: 7,

          owner: 8,

          question: "Qui est le peintre de la Joconde",

          nbAppearance: 55,

          nbContestation: 15,

          concept: 4,

          goodAnswer: "",

        },



        ]);





      })



      .then(() => console.log('finished question'))

      

    Choice.destroy({ where: {} })

      .then(() => {

        let concept = Choice.bulkCreate([{



          _id: 1,

          question: 1,

          statement: "Fedora"

        },

        {



          _id: 2,

          question: 1,

          statement: "Captain"

        },

        {



          _id: 3,

          question: 1,

          statement: "Ubuntu"

        },

        {



          _id: 4,

          question: 1,

          statement: "Debian"

        },

        {



          _id: 5,

          question: 2,

          statement: "Windows 1.0"

        },

        {



          _id: 6,

          question: 2,

          statement: "Windows 3"

        },

        {



          _id: 7,

          question: 2,

          statement: "Windows"

        },

        {



          _id: 8,

          question: 2,

          statement: "Windows xp"

        },

        {



          _id: 9,

          question: 3,

          statement: "1936"

        },

        {



          _id: 10,

          question: 3,

          statement: "1943"

        },

        {



          _id: 11,

          question: 3,

          statement: "2011"

        },

        {



          _id: 13,

          question: 3,

          statement: "Carl Orff"

        },

        {



          _id: 14,

          question: 4,

          statement: "Mozart"

        },

        {



          _id: 15,

          question: 4,

          statement: "Rossini"

        },

        {



          _id: 16,

          question: 4,

          statement: "Beethoven"

        },



        ]);

      })

      .then(() => console.log('finished populating things'))

      .catch(err => console.log('error populating things', err));

  }

}