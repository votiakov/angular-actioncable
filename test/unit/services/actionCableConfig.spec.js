'use strict';

describe('ActionCableConfig', function(){
  var ActionCableConfig;
  beforeEach(module('ngActionCable'));
  beforeEach(inject(function(_ActionCableConfig_){
    ActionCableConfig= _ActionCableConfig_;
  }));
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
      var wholeDocument, actionCableMetaTag, metaTags;
      beforeEach(function() {
        wholeDocument= {data: function(){}, find: function(tag){} };
        actionCableMetaTag= function(name){
          if (name=== 'name') {
            return 'action-cable-url';
          };
          if (name=== 'content') {
            return 'wss://foobar.tld:1234/path/name';
          };
          return false;
        };
        metaTags= [{
          hasAttribute: actionCableMetaTag,
          getAttribute: actionCableMetaTag
        }];
        spyOn(angular, 'element').and.returnValue(wholeDocument);
        spyOn(wholeDocument, 'find').and.returnValue(metaTags);
      });
      it('returns meta value', function(){
        expect(ActionCableConfig.wsUri).toBe('wss://foobar.tld:1234/path/name');
        expect(wholeDocument.find).toHaveBeenCalledWith('meta');
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
