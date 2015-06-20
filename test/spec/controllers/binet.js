'use strict';

describe('Controller: BinetCtrl', function () {

  // load the controller's module
  beforeEach(module('jtxClientApp'));

  var BinetCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BinetCtrl = $controller('BinetCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
