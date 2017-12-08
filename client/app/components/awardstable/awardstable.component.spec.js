'use strict';

describe('Component: awardstable', function() {
  // load the component's module
  beforeEach(module('skillGameApp.awardstable'));

  var awardstableComponent;

  // Initialize the component and a mock scope
  beforeEach(inject(function($componentController) {
    awardstableComponent = $componentController('awardstable', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
