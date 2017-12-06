/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';

export default function(app) {
  // Insert routes below

  app.use('/api/alonescores', require('./api/alonescore'));
  app.use('/api/awards', require('./api/award'));

  app.use('/api/badges', require('./api/badge'));
  app.use('/api/answers', require('./api/answer')); 
  app.use('/api/choices', require('./api/choice'));
  app.use('/api/concepts', require('./api/concept'));
  app.use('/api/games', require('./api/game'));
  app.use('/api/scores', require('./api/score'));
  app.use('/api/messages', require('./api/message'));
  app.use('/api/questions',require("./api/question"));
  app.use('/api/things', require('./api/thing'));
  app.use('/api/users', require('./api/user'));

  


  app.use('/auth', require('./auth').default);

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(`${app.get('appPath')}/index.html`));
    });
}
