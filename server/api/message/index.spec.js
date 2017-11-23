'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var messageCtrlStub = {
  index:  'messageCtrl.index',
  show:   'messageCtrl.show',
  create: 'messageCtrl.create',
  upsert: 'messageCtrl.upsert',
  destroy:'messageCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var messageIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './message.controller': messageCtrlStub
});

describe('Message API Router:', function() {
  it('should return an express router instance', function() {
    messageIndex.should.equal(routerStub);
  });

   /**
 * @api {get} /messages  Read data of Message
 * 
 * @apiName GetMessage
 * @apiGroup Message
 * @apiPermission none
 *
 * @apiParam {String} expediteur Expediteur of the Message.
 * @apiParam {String} destinateur Destinateur of the Message.
 * @apiParam {Number} msg_type Type of the Message.
 * @apiParam {String} message Message.
 * 
 *@apiSuccess  {Number} id  The new Message-ID.
 * 
 * @apiError MessageNotFound The <code>id</code> of the Message was not found.
 * 
 *  @apiErrorExample {json} Error-Response(exemple):
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "MessageNotFound"
 *     }
 */

  describe('GET /api/message', function() {
    it('should route to message.controller.index', function() {
      routerStub.get
        .withArgs('/', 'messageCtrl.index')
        .should.have.been.calledOnce;
    });
  });

  /**
 * @api {get} /messages/:id Read data of Message by id
 * 
 * @apiName GetMessage
 * @apiGroup Message
 * @apiPermission none
 *
 * @apiParam {String} expediteur Expediteur of the Message.
 * @apiParam {String} destinateur Destinateur of the Message.
 * @apiParam {Number} msg_type Type of the Message.
 * @apiParam {String} message Message .
 * 
 *@apiSuccess  {Number} id  The new Message-ID.
 * 
 * @apiError MessageNotFound The <code>id</code> of the Message was not found.
 * 
 *  @apiErrorExample {json} Error-Response(exemple):
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "MessageNotFound"
 *     }
 */

  describe('GET /api/message/:id', function() {
    it('should route to message.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'messageCtrl.show')
        .should.have.been.calledOnce;
    });
  });

   /**
 * @api {post} /messages  Create a new Message
 * 
 * @apiName PostMessage
 * @apiGroup Message
 * @apiPermission none
 *
 * @apiParam {String} expediteur Expediteur of the Message.
 * @apiParam {String} destinateur Destinateur of the Message.
 * @apiParam {Number} msg_type Type of the Message.
 * @apiParam {String} message Message .
 *
 *@apiSuccess  {Number} id  The new Message-ID.
 * 
 * @apiError MessageNotFound Minimum of 5 characters required.
 * 
 *  @apiErrorExample {json} Error-Response(exemple):
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "MessageNameTooShort"
 *     }
 */

  describe('POST /api/message', function() {
    it('should route to message.controller.create', function() {
      routerStub.post
        .withArgs('/', 'messageCtrl.create')
        .should.have.been.calledOnce;
    });
  });

  /**
 * @api {put} /messages/:id  Change a Message 
 * 
 * @apiName PutMessage
 * @apiGroup Message
 * @apiPermission none
 *
 * @apiParam {String} expediteur Expediteur of the Message.
 * @apiParam {String} destinateur Destinateur of the Message.
 * @apiParam {Number} msg_type Type of the Message.
 * @apiParam {String} message Message .
 *
 * 
 * @apiError MessageNotFound Minimum of 5 characters required.
 * 
 *  @apiErrorExample {json} Error-Response(exemple):
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "MessageNameTooShort"
 *     }
 */


  describe('PUT /api/message/:id', function() {
    it('should route to message.controller.upsert', function() {
      routerStub.put
        .withArgs('/:id', 'messageCtrl.upsert')
        .should.have.been.calledOnce;
    });
  });

   /**
 * @api {delete} /messages/:id  delete a Message 
 * 
 * @apiName DeleteMessage
 * @apiGroup Message
 * @apiPermission none
 *
 *
 * 
 * @apiError MessageNotFound The <code>id</code> of the Message was not found.
 * 
 *  @apiErrorExample {json} Error-Response(exemple):
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "MessageNotFound"
 *     }
 */

  describe('DELETE /api/message/:id', function() {
    it('should route to message.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'messageCtrl.destroy')
        .should.have.been.calledOnce;
    });
  });
});
