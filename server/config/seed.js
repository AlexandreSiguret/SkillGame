/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import sqldb from '../sqldb';
import config from './environment/';

export default function seedDatabaseIfNeeded() {
  if(config.seedDB) {
    let Thing = sqldb.Thing;
    let User = sqldb.User;
    let Concept = sqldb.Concept;

    return Concept.destroy({ where: {} })
      .then(() => {
        let concept = Concept.bulkCreate([{
          name: 'Computer sciences'         
        }, {
          name: 'Iphone X'
        }, {
          name: 'Judo'
        }, {
          name: 'Art'
        
        }]);
        return concept;
      })
      .then(() => console.log('finished populating things'))
      .catch(err => console.log('error populating things', err));

    User.destroy({ where: {} })
      .then(() => User.bulkCreate([{
        provider: 'local',
        name: 'Test User',
        email: 'test@example.com',
        password: 'test'
      }, {
        provider: 'local',
        role: 'admin',
        name: 'Admin',
        email: 'admin@example.com',
        password: 'admin'
      }])
        .then(() => console.log('finished populating users'))
        .catch(err => console.log('error populating users', err)));
  }
}
