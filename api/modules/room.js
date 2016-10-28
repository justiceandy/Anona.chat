// Chat Room Module
// Handles Room Related Functions

// Default Modules
var express = require('express');
var Promise = require('bluebird');
var request = require("request");
var config = require('../settings');

// Get Rooms
exports.list = function(){
  return new Promise(function(resolve, reject) {
    var url = config.plugins.matrix.host+'/publicRooms';
    request({uri: url},
    function(error, response, body) {
      resolve(JSON.parse(body));
    })
  });
}

// Join Room
//
exports.join = function(roomID, token){
  return new Promise(function(resolve, reject) {
    var url = config.plugins.matrix.host+'/join/'+roomID+'?access_token='+token;
    request({
      uri: url,
      method: "POST",
      timeout: 2000
    },
    function(error, response, body) {
      resolve(body);
    })
  });
}


// Get Intial Room Data
exports.getInitialSync = function(roomID, token){
  return new Promise(function(resolve, reject) {
    var url = config.plugins.matrix.host+'/rooms/'+roomID+'/initialSync?access_token='+token;
    request({
      uri: url,
      method: "GET",
      timeout: 2000
    },
    function(error, response, body){
      resolve(JSON.parse(body));
    })
  });
}


exports.parseState = function(state){
  return new Promise(function(resolve, reject) {
    var parsed = {};
    state.map(function(item){
      if(item.type === 'm.room.aliases'){
        parsed.aliases = item.content.aliases;
      }
    })
    resolve(parsed);
  });
}

module.exports = exports;
