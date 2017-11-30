'use strict';

describe('Component: JeuchronoComponent', function() {
  // load the controller's module
  beforeEach(module('skillGameApp.jeuchrono'));

  var JeuchronoComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    JeuchronoComponent = $componentController('jeuchrono', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
