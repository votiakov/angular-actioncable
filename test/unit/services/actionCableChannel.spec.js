'use strict';

describe('ActionCableChannel', function(){
  var ActionCableChannel,
      resetActionCableWebsocketMock,
      ActionCableWebsocket;
  beforeEach(module('ngActionCable'));
  resetActionCableWebsocketMock= function(){
    ActionCableWebsocket= {
      connected: function(){},
      attempt_restart: function(){},
      currentChannels: null,
      close: function(){},
      on_connection_close_callback: function(){},
      on_connection_open_callback: function(){},
      subscribe: function(){},
      unsubscribe: function(){},
      send: function(){}
    };
  };
  beforeEach(function(){
    resetActionCableWebsocketMock();
    module(function($provide) {$provide.value('ActionCableChannel', ActionCableChannel);});
  });
  it('exists', function(){
    expect(ActionCableChannel).toBeObject;
  });
});
