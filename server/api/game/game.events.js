/**
 * Game model events
 */

'use strict';

import {EventEmitter} from 'events';
var Game = require('../../sqldb').Game;
var GameEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
GameEvents.setMaxListeners(0);

// Model events
var events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Game) {
  for(var e in events) {
    let event = events[e];
    Game.hook(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc, options, done) {
    GameEvents.emit(event + ':' + doc._id, doc);
    GameEvents.emit(event, doc);
    done(null);
  };
}

registerEvents(Game);
export default GameEvents;
