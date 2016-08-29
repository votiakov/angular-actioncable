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
  describe('ping', function(){
    var railsPing= {};
    beforeEach(function(){
      railsPing= {
        five: {
          type: 'ping'
        },
        five_beta_3: {
          identifier: '_ping'
        }
      };
    });
    describe('Rails ', function(){
      ['five', 'five_beta_3'].forEach(function(rails_version, index, array){
        describe(rails_version, function(){
          it('after_ping_callback', function(){
            var fired= false;
            var callback= function(){ fired= true; };
            ActionCableController.after_ping_callback= callback;
            ActionCableController.post(railsPing[rails_version]);
            expect(fired).toBe(true);
          });
        });
      });
    });
  });
});
