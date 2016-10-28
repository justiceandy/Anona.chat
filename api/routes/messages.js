var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var messages = require('../modules/messages');

/**
 * @api {get} /chat/messages
 * @apiName getRecentMessages
 * @apiGroup messages
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *   {
 *      "messages": [
 *
 *      ]
 *  }
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 200 Not Found
 *     {
 *       "error": {
 *          "message": "",
 *            "error": ""
 *       }
 *     }
 */
router.get('/chat/messages', function(req, res) {
  messages.getGuestRecent(req.cookies.room, req.cookies.access)
  .then(function(result){
    res.json(result);
  })
  .catch(function(err){
    res.send(err);
  });
});


router.post('/chat/send', function(req, res) {
  var submitted =  JSON.parse(Object.keys(req.body)[0]);
  console.log(submitted);
  messages.getGuestRecent(req.cookies.room, req.cookies.access, submitted)
  .then(function(result){
    res.json(result);
  })
  .catch(function(err){
    res.send(err);
  });
  console.log(submitted);
});

module.exports = router;
