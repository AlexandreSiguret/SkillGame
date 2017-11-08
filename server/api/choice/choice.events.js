/**
 * Choice model events
 */

'use strict';

import {EventEmitter} from 'events';
var Choice = require('../../sqldb').Choice;
var ChoiceEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ChoiceEvents.setMaxListeners(0);

// Model events
var events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Choice) {
  for(var e in events) {
    let event = events[e];
    Choice.hook(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc, options, done) {
    ChoiceEvents.emit(event + ':' + doc._id, doc);
    ChoiceEvents.emit(event, doc);
    done(null);
  };
}

registerEvents(Choice);
export default ChoiceEvents;
