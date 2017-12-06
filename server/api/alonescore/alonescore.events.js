/**
 * Alonescore model events
 */

'use strict';

import {EventEmitter} from 'events';
var Alonescore = require('../../sqldb').Alonescore;
var AlonescoreEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
AlonescoreEvents.setMaxListeners(0);

// Model events
var events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Alonescore) {
  for(var e in events) {
    let event = events[e];
    Alonescore.hook(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc, options, done) {
    AlonescoreEvents.emit(event + ':' + doc._id, doc);
    AlonescoreEvents.emit(event, doc);
    done(null);
  };
}

registerEvents(Alonescore);
export default AlonescoreEvents;
