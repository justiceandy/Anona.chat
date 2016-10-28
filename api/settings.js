var express = require('express');
var uuid = require('node-uuid');

// Api Settings
var settings = {
    name: 'anona.chat',
    port: 4000,
    requestTimeout: 2000,
    favicon: '/app/static/images/favicon.ico',
    views: '/api/view/jade',
    renderEngine: 'jade',
    sessions: {
      cookieName: 'session',
      secret: uuid.v4(),
      duration: 30 * 60 * 1000,
      activeDuration:  5 * 60 * 1000
    },
    defaultSession: {
      'loggedIn': false,
      'verified': false,
      'loginAttempts': 0
    },
    plugins: {
      matrix: {
        host: 'https://anona.chat:8448/_matrix/client/r0',
        defaultRoom: '!uYvMTIdIXecIdHQgVR:anona.chat'
      }
    }
}

module.exports = settings;
