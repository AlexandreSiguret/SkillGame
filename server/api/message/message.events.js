/**
 * Message model events
 */

'use strict';

import {EventEmitter} from 'events';
var Message = require('../../sqldb').Message;
var MessageEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
MessageEvents.setMaxListeners(0);

// Model events
var events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Message) {
  for(var e in events) {
    let event = events[e];
    Message.hook(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc, options, done) {
    MessageEvents.emit(event + ':' + doc._id, doc);
    MessageEvents.emit(event, doc);
    done(null);
  };
}

registerEvents(Message);
export default MessageEvents;
