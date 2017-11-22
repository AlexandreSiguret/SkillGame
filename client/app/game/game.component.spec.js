'use strict';

describe('Component: GameComponent', function() {
  // load the controller's module
  beforeEach(module('skillGameApp.game'));

  var GameComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    GameComponent = $componentController('game', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
