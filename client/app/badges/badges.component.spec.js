'use strict';

describe('Component: BadgesComponent', function() {
  // load the controller's module
  beforeEach(module('skillGameApp.badges'));

  var BadgesComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    BadgesComponent = $componentController('badges', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
