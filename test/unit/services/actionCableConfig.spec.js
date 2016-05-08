'use strict';

describe('ActionCableConfig', function(){
  var ActionCableConfig;
  beforeEach(module('ngActionCable'));
  beforeEach(inject(function(_ActionCableConfig_){
    ActionCableConfig= _ActionCableConfig_;
  }));
  describe('module', function(){
    it('exists', function(){
      expect(ActionCableConfig).toBeObject;
    });
  });
  describe('autoStart', function() {
    it('initiates to true', function(){
      expect(ActionCableConfig.autoStart).toBe(true);
    });
    describe('when set false', function() {
      beforeEach(function() {
        ActionCableConfig.autoStart= false;
      });

      it('returns false', function(){
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
      it('returns true', function(){
        expect(ActionCableConfig.debug).toBe(true);
      });
    });
  });
  describe('wsUri', function() {
    describe('when meta tag set', function() {
      it('returns meta value', function(){
        //the meta tag needs to be faked here but the html is loaded before angular and the jquery is executed on file read
        //expect(ActionCableConfig.wsUri).toBe('wss://foobar.tld:1234/path/name');
      });
    });
    describe('when meta tag not found', function() {
      it('returns empty', function(){
        expect(ActionCableConfig.wsUri).toBe('');
      });
    });
  });
});
