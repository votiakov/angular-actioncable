'use strict';

// default websocket configs
// looks for Rails' <%= action_cable_meta_tag %> in this format:
// <meta name="action-cable-url" content="ws://localhost:3000/cable"/>
ngActionCable.value('ActionCableConfig', (function() {
  var defaultWsUri= 'wss://please.add.an.actioncable.meta.tag.invalid:12345/path/to/cable';
  var defaultAutoStart= true;
  var defaultDebug= false;
  var _wsUri;
  var _autoStart;
  var _debug;
  var config= {};
  Object.defineProperty(config, 'autoStart', {
    get: function () {
      return (_autoStart=== undefined ? defaultAutoStart : _autoStart);
    },
    set: function(newAutoStart) {
      _autoStart= (!isBlank(newAutoStart) && newAutoStart);
      return _autoStart;
    }
  });
  Object.defineProperty(config, 'debug', {
    get: function () {
      return (_debug=== undefined ? defaultDebug : _debug);
    },
    set: function(newDebug) {
      _debug= (!isBlank(newDebug) && newDebug);
      return config.debug;
    }
  });
  Object.defineProperty(config, 'wsUri', {
    get: function () {
      _wsUri= _wsUri=== undefined ? (
        (!isBlank(actioncable_meta_tag_content()) && actioncable_meta_tag_content()) ||  defaultWsUri
      ) : _wsUri;
      return _wsUri;
    },
    set: function(newWsUri) {
      _wsUri= (!isBlank(newWsUri) && String(newWsUri)) || newWsUri;
      return _wsUri;
    }
  });
  return config;
  function actioncable_meta_tag_content() {
    return angular.element("meta[name='action-cable-url']").attr("content");
  }
  function isBlank(str) {
    return (!str || /^\s*$/.test(str));
  }
})());
