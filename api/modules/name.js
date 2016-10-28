// Display Name Module
//
// Default Modules
var express = require('express');
var Promise = require('bluebird');
var request = require("request");
var shortid = require('shortid');

var config = require('../settings');

// Set Anon.chat Default Name
// Requires Profile ID from Token Packet
exports.setDefault = function(userID, token){
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

module.exports = exports;
