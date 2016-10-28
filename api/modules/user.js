// User Module
//
// Default Modules
var express = require('express');
var Promise = require('bluebird');
var request = require("request");

var config = require('../settings');

// Get User Profile
// Requires Profile ID and Token of Requester of Profile
exports.getProfile = function(userID, token){
  return new Promise(function(resolve, reject) {
    var url = config.plugins.matrix.host+'/profile/'+userID+'?access_token='+token;
    request({
      uri: url,
      method: "GET",
      timeout: 2000
    },
    function(error, response, body) {
      resolve(JSON.parse(body))
    })
  });
}

module.exports = exports;
