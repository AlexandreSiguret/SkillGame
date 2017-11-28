/**
 * Quelqueendpoint model events
 */

'use strict';

import {EventEmitter} from 'events';
var Quelqueendpoint = require('../../sqldb').Quelqueendpoint;
var QuelqueendpointEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
QuelqueendpointEvents.setMaxListeners(0);

// Model events
var events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Quelqueendpoint) {
  for(var e in events) {
    let event = events[e];
    Quelqueendpoint.hook(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc, options, done) {
    QuelqueendpointEvents.emit(event + ':' + doc._id, doc);
    QuelqueendpointEvents.emit(event, doc);
    done(null);
  };
}

registerEvents(Quelqueendpoint);
export default QuelqueendpointEvents;
