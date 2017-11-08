/**
 * Answer model events
 */

'use strict';

import {EventEmitter} from 'events';
var Answer = require('../../sqldb').Answer;
var AnswerEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
AnswerEvents.setMaxListeners(0);

// Model events
var events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Answer) {
  for(var e in events) {
    let event = events[e];
    Answer.hook(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc, options, done) {
    AnswerEvents.emit(event + ':' + doc._id, doc);
    AnswerEvents.emit(event, doc);
    done(null);
  };
}

registerEvents(Answer);
export default AnswerEvents;
