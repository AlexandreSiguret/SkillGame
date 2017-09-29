/**
 * Concept model events
 */

'use strict';

import {EventEmitter} from 'events';
var Concept = require('../../sqldb').Concept;
var ConceptEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ConceptEvents.setMaxListeners(0);

// Model events
var events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Concept) {
  for(var e in events) {
    let event = events[e];
    Concept.hook(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc, options, done) {
    ConceptEvents.emit(event + ':' + doc._id, doc);
    ConceptEvents.emit(event, doc);
    done(null);
  };
}

registerEvents(Concept);
export default ConceptEvents;
