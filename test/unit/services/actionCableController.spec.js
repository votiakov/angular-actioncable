'use strict';

describe('ActionCableController', function(){
  var ActionCableController;
  beforeEach(module('ngActionCable'));
  beforeEach(inject(function(_ActionCableController_){
    ActionCableController= _ActionCableController_;
  }));
  var rootScope;
  beforeEach(inject(function($injector) {
    rootScope = $injector.get('$rootScope');
    spyOn(rootScope, '$broadcast');
  }));
  it('exists', function(){
    expect(ActionCableController).toBeObject;
  });
  describe('subscription', function(){
    var railsMessage;
    beforeEach(function(){
      railsMessage= {
        type: 'confirm_subscription',
        identifier: JSON.stringify({'channel': 'fooBarChannel'})
      };
    });
    it('broadcasts', function(){
      ActionCableController.post(railsMessage);
      expect(rootScope.$broadcast).toHaveBeenCalledWith('confirm_subscription:fooBarChannel');
    });
  });
});
