'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var gameCtrlStub = {
  index: 'gameCtrl.index',
  show: 'gameCtrl.show',
  create: 'gameCtrl.create',
  upsert: 'gameCtrl.upsert',
  patch: 'gameCtrl.patch',
  destroy: 'gameCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var gameIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './game.controller': gameCtrlStub
});

describe('Game API Router:', function() {
  it('should return an express router instance', function() {
    gameIndex.should.equal(routerStub);
  });

  /**
 * @api {get} /games  Read data of Game 
 * 
 * @apiName GetGame 
 * @apiGroup Game 
 * @apiPermission none
 *
 * @apiParam {Number} UserId ID of User.
 * @apiParam {Number} ConceptId ID of Concept.
 * @apiParam {Boolean} ended Ended of game.
 * 
 * 
 * @apiError GameNotFound The <code>id</code> of the Game was not found.
 * 
 *  @apiErrorExample {json} Error-Response(exemple):
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "GameNotFound"
 *     }
 */

  describe('GET /api/games', function() {
    it('should route to game.controller.index', function() {
      routerStub.get
        .withArgs('/', 'gameCtrl.index')
        .should.have.been.calledOnce;
    });
  });

 /**
 * @api {get} /games/:id Read data of Game by id
 * 
 * @apiName GetGame
 * @apiGroup Game
 * @apiPermission none
 *
 * @apiParam {Number} UserId ID of User.
 * @apiParam {Number} ConceptId ID of Concept.
 * @apiParam {Boolean} ended Ended of game.
 * 
 * 
 * @apiError GameNotFound The <code>id</code> of the Game was not found.
 * 
 *  @apiErrorExample {json} Error-Response(exemple):
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "GameNotFound"
 *     }
 */


  describe('GET /api/games/:id', function() {
    it('should route to game.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'gameCtrl.show')
        .should.have.been.calledOnce;
    });
  });

   /**
 * @api {post} /games  Create a new Game 
 * 
 * @apiName PostGame
 * @apiGroup Game
 * @apiPermission none
 *
 * @apiParam {Number} UserId ID of User.
 * @apiParam {Number} ConceptId ID of Concept.
 * @apiParam {Boolean} ended Ended of game.
 *
 * 
 * @apiError GameNotFound Minimum of 5 characters required.
 * 
 *  @apiErrorExample {json} Error-Response(exemple):
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "GameNameTooShort"
 *     }
 */

  describe('POST /api/games', function() {
    it('should route to game.controller.create', function() {
      routerStub.post
        .withArgs('/', 'gameCtrl.create')
        .should.have.been.calledOnce;
    });
  });

/**
 * @api {put} /games/:id  Change a Game 
 * 
 * @apiName PutGame 
 * @apiGroup Game 
 * @apiPermission none
 *
 * @apiParam {Number} UserId ID of User.
 * @apiParam {Number} ConceptId ID of Concept.
 * @apiParam {Boolean} ended Ended of game.
 *
 * 
 * @apiError GameNotFound Minimum of 5 characters required.
 * 
 *  @apiErrorExample {json} Error-Response(exemple):
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "GameNameTooShort"
 *     }
 */

  describe('PUT /api/games/:id', function() {
    it('should route to game.controller.upsert', function() {
      routerStub.put
        .withArgs('/:id', 'gameCtrl.upsert')
        .should.have.been.calledOnce;
    });
  });

  
  /**
 * @api {patch} /games/:id  Change a Game 
 * 
 * @apiName PatchGame
 * @apiGroup Game
 * @apiPermission none
 *
 * @apiParam {Number} UserId ID of User.
 * @apiParam {Number} ConceptId ID of Concept.
 * @apiParam {Boolean} ended Ended of game.
 *
 * 
 * @apiError GameNotFound Minimum of 5 characters required.
 * 
 *  @apiErrorExample {json} Error-Response(exemple):
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "GameNameTooShort"
 *     }
 */

  describe('PATCH /api/games/:id', function() {
    it('should route to game.controller.patch', function() {
      routerStub.patch
        .withArgs('/:id', 'gameCtrl.patch')
        .should.have.been.calledOnce;
    });
  });

  /**
 * @api {delete} /games/:id  delete a Game 
 * 
 * @apiName DeleteGame
 * @apiGroup Game
 * @apiPermission none
 *
 *
 * 
 * @apiError GameNotFound The <code>id</code> of Game was not found.
 * 
 *  @apiErrorExample {json} Error-Response(exemple):
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "GameNotFound"
 *     }
 */

  describe('DELETE /api/games/:id', function() {
    it('should route to game.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'gameCtrl.destroy')
        .should.have.been.calledOnce;
    });
  });
});
