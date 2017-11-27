/**
 * Score model events
 */

'use strict';

import {EventEmitter} from 'events';
var Score = require('../../sqldb').Score;
var ScoreEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ScoreEvents.setMaxListeners(0);

// Model events
var events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Score) {
  for(var e in events) {
    let event = events[e];
    Score.hook(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc, options, done) {
    ScoreEvents.emit(event + ':' + doc._id, doc);
    ScoreEvents.emit(event, doc);
    done(null);
  };
}

registerEvents(Score);
export default ScoreEvents;
