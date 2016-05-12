'use strict';

describe('ActionCableConfig', function(){
  var ActionCableConfig;
  beforeEach(module('ngActionCable'));
  beforeEach(inject(function(_ActionCableConfig_){
    ActionCableConfig= _ActionCableConfig_;
  }));
  afterEach(function(){
    resetActionCableConfig();
  });
  function resetActionCableConfig() {
    ActionCableConfig.wsUri= undefined;
    ActionCableConfig.autoStart= undefined;
    ActionCableConfig.debug= undefined;
  };
  describe('autoStart', function() {
    it('initiates to true', function(){
      expect(ActionCableConfig.autoStart).toBe(true);
    });
    describe('when set false', function() {
      beforeEach(function() {
        ActionCableConfig.autoStart= false;
      });

      it('remembers false', function(){
        expect(ActionCableConfig.autoStart).toBe(false);
      });
    });
  });
  describe('debug', function() {
    it('initiates to false', function(){
      expect(ActionCableConfig.debug).toBe(false);
    });
    describe('when set true', function() {
      beforeEach(function() {
        ActionCableConfig.debug= true;
      });
      it('remembers true', function(){
        expect(ActionCableConfig.debug).toBe(true);
      });
    });
  });
  describe('wsUri', function() {
    describe('when meta tag set', function() {
      var element, attr;
      beforeEach(function() {
        element= { attr: null, data: function(){} };
        attr= 'wss://foobar.tld:1234/path/name';
        spyOn(angular, 'element').and.returnValue(element);
        spyOn(element, 'attr').and.returnValue(attr);
      });
      it('returns meta value', function(){
        expect(ActionCableConfig.wsUri).toBe('wss://foobar.tld:1234/path/name');
        expect(angular.element).toHaveBeenCalledWith("meta[name='action-cable-url']");
        expect(element.attr).toHaveBeenCalledWith("content");
      });
    });
    describe('when meta tag not found', function() {
      it('returns helpful example', function(){
        expect(ActionCableConfig.wsUri).toBe('wss://please.add.an.actioncable.meta.tag.invalid:12345/path/to/cable');
      });
    });
    describe('after being explicitly set', function() {
      beforeEach(function() {
        ActionCableConfig.wsUri= 'String 42';
      });
      it('remembers the setting', function(){
        expect(ActionCableConfig.wsUri).toBe('String 42');
      });
    });
  });
});
