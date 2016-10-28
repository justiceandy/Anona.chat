// Display Name Module
//
// Default Modules
var express = require('express');
var Promise = require('bluebird');
var request = require("request");
var shortid = require('shortid');
var rooms = require('./room');

var config = require('../settings');

// Set Anon.chat Default Name
// Requires Profile ID from Token Packet
exports.getRecent = function(roomID, token){
  return new Promise(function(resolve, reject) {
    var url = config.plugins.matrix.host+'/profile/'+userID+'/displayname?access_token='+token;
    var displayName =  'anona'+shortid.generate();
    var rBody = { 'displayname':  displayName };
    request({
      uri: url,
      method: "PUT",
      timeout: 2000,
      body: JSON.stringify(rBody)
    },
    function(error, response, body) {
      resolve(displayName)
    })
  });
}

// Get Guest Recent Messages for a Channel
// Run through sync instead because guest cant access profile routes
exports.getGuestRecent = function(roomID, token){
  return new Promise(function(resolve, reject) {
    var url = config.plugins.matrix.host+'/rooms/'+roomID+'/initialSync?access_token='+token;
    var messages = [];
    var sync = {};
    var room = {
      id: roomID
    };
    rooms.getInitialSync(roomID, token)
    .then(function(result){
      sync = result;
      result.messages.chunk.map(function(item){
        if(item.type === 'm.room.message'){
          messages.push(item);
        }
      })
    })
    .then(function(result){
      return rooms.parseState(sync.state);
    })
    .then(function(result){
      room.name = result.aliases[0];
      return true;
    })
    .then(function(result){
        resolve({
          messages: messages,
          room: room
        });
    })
    .catch(function(err){
      reject(err);
    })
  });
}

//  Send Message to Chanel
exports.send = function(roomID, token){
  return new Promise(function(resolve, reject) {
    resolve(message);
  });
}

module.exports = exports;
