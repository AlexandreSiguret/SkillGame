'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var userCtrlStub = {
  index: 'userCtrl.index',
  destroy: 'userCtrl.destroy',
  me: 'userCtrl.me',
  changePassword: 'userCtrl.changePassword',
  show: 'userCtrl.show',
  create: 'userCtrl.create'
};

var authServiceStub = {
  isAuthenticated() {
    return 'authService.isAuthenticated';
  },
  hasRole(role) {
    return `authService.hasRole.${role}`;
  }
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var userIndex = proxyquire('./index', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './user.controller': userCtrlStub,
  '../../auth/auth.service': authServiceStub
});

describe('User API Router:', function() {
  it('should return an express router instance', function() {
    userIndex.should.equal(routerStub);
  });

  /**
 * @api {get} /users  Read data of User
 * 
 * @apiName GetUser
 * @apiGroup User
 * @apiPermission none
 *
 * @apiParam {String} provider provider .
 * @apiParam {String} name name of the User..
 * @apiParam {String} avatar Avatar of the User.
 * @apiParam {String} email Email of the User.
 * @apiParam {String} password Password of the User.
 * 
 *@apiSuccess  {Number} id  The new User-ID.
 * 
 * @apiError UserNotFound The <code>id</code> of the User was not found.
 * 
 *  @apiErrorExample {json} Error-Response(exemple):
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "UserNotFound"
 *     }
 */

  describe('GET /api/users', function() {
    it('should verify admin role and route to user.controller.index', function() {
      routerStub.get
        .withArgs('/', 'authService.hasRole.admin', 'userCtrl.index')
        .should.have.been.calledOnce;
    });
  });

   /**
 * @api {delete} /users/:id  delete a User 
 * 
 * @apiName DeleteUser
 * @apiGroup User
 * @apiPermission none
 *
 *
 * 
 * @apiError UserNotFound The <code>id</code> of the User was not found.
 * 
 *  @apiErrorExample {json} Error-Response(exemple):
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "UserNotFound"
 *     }
 */

  describe('DELETE /api/users/:id', function() {
    it('should verify admin role and route to user.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'authService.hasRole.admin', 'userCtrl.destroy')
        .should.have.been.calledOnce;
    });
  });

   /**
 * @api {get} /users/me Read data of User (me)
 * 
 * @apiName GetUser
 * @apiGroup User
 * @apiPermission none
 *
 * @apiParam {String} provider provider .
 * @apiParam {String} name name of the User..
 * @apiParam {String} avatar Avatar of the User.
 * @apiParam {String} email Email of the User.
 * @apiParam {String} password Password of the User.
 * 
 *@apiSuccess  {Number} id  The new User-ID.
 * 
 * @apiError UserNotFound The <code>id</code> of the User was not found.
 * 
 *  @apiErrorExample {json} Error-Response(exemple):
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "UserNotFound"
 *     }
 */
  describe('GET /api/users/me', function() {
    it('should be authenticated and route to user.controller.me', function() {
      routerStub.get
        .withArgs('/me', 'authService.isAuthenticated', 'userCtrl.me')
        .should.have.been.calledOnce;
    });
  });

   /**
 * @api {put} /users/:id/password  Change a User With password
 * 
 * @apiName PutUser
 * @apiGroup User
 * @apiPermission none
 *
 * @apiParam {String} provider provider .
 * @apiParam {String} name name of the User..
 * @apiParam {String} avatar Avatar of the User.
 * @apiParam {String} email Email of the User.
 * @apiParam {String} password Password of the User.
 *
 * 
 * @apiError UserNotFound Minimum of 5 characters required.
 * 
 *  @apiErrorExample {json} Error-Response(exemple):
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "UserNameTooShort"
 *     }
 */

  describe('PUT /api/users/:id/password', function() {
    it('should be authenticated and route to user.controller.changePassword', function() {
      routerStub.put
        .withArgs('/:id/password', 'authService.isAuthenticated', 'userCtrl.changePassword')
        .should.have.been.calledOnce;
    });
  });

  /**
 * @api {get} /users/:id Read data of User by id
 * 
 * @apiName GetUser
 * @apiGroup User
 * @apiPermission none
 *
 * @apiParam {String} provider provider .
 * @apiParam {String} name name of the User..
 * @apiParam {String} avatar Avatar of the User.
 * @apiParam {String} email Email of the User.
 * @apiParam {String} password Password of the User.
 * 
 *@apiSuccess  {Number} id  The new User-ID.
 * 
 * @apiError UserNotFound The <code>id</code> of the User was not found.
 * 
 *  @apiErrorExample {json} Error-Response(exemple):
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "UserNotFound"
 *     }
 */

  describe('GET /api/users/:id', function() {
    it('should be authenticated and route to user.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'authService.isAuthenticated', 'userCtrl.show')
        .should.have.been.calledOnce;
    });
  });

   /**
 * @api {post} /users  Create a new User
 * 
 * @apiName PostUser
 * @apiGroup User
 * @apiPermission none
 *
 * @apiParam {String} provider provider .
 * @apiParam {String} name name of the User..
 * @apiParam {String} avatar Avatar of the User.
 * @apiParam {String} email Email of the User.
 * @apiParam {String} password Password of the User.
 *
 *@apiSuccess  {Number} id  The new User-ID.
 * 
 * @apiError UserNotFound Minimum of 5 characters required.
 * 
 *  @apiErrorExample {json} Error-Response(exemple):
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "UserNameTooShort"
 *     }
 */

  describe('POST /api/users', function() {
    it('should route to user.controller.create', function() {
      routerStub.post
        .withArgs('/', 'userCtrl.create')
        .should.have.been.calledOnce;
    });
  });
});
