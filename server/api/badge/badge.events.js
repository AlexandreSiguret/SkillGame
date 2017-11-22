/**
 * Badge model events
 */

'use strict';

import {EventEmitter} from 'events';
var Badge = require('../../sqldb').Badge;
var BadgeEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
BadgeEvents.setMaxListeners(0);

// Model events
var events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Badge) {
  for(var e in events) {
    let event = events[e];
    Badge.hook(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc, options, done) {
    BadgeEvents.emit(event + ':' + doc._id, doc);
    BadgeEvents.emit(event, doc);
    done(null);
  };
}

registerEvents(Badge);
export default BadgeEvents;
