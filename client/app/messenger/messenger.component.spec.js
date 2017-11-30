'use strict';

describe('Component: MessengerComponent', function() {
  // load the controller's module
  beforeEach(module('skillGameApp.messenger'));

  var MessengerComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    MessengerComponent = $componentController('messenger', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
