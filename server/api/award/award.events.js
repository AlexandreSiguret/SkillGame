/**
 * Award model events
 */

'use strict';

import {EventEmitter} from 'events';
var Award = require('../../sqldb').Award;
var AwardEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
AwardEvents.setMaxListeners(0);

// Model events
var events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Award) {
  for(var e in events) {
    let event = events[e];
    Award.hook(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc, options, done) {
    AwardEvents.emit(event + ':' + doc._id, doc);
    AwardEvents.emit(event, doc);
    done(null);
  };
}

registerEvents(Award);
export default AwardEvents;
