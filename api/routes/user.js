var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var user = require('../modules/user');

/**
 * @api {get} /chat/authenticate/guest Autheticate New Guest User
 * @apiName authenticateGuest
 * @apiGroup Chat
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *   {
 *      "token": [
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
router.get('/profile', function(req, res) {
  user.getProfile(req.cookies.user, req.cookies.access)
  .then(function(result){
    res.json(result);
  })
  .catch(function(err){
    res.send(err);
  });
});


module.exports = router;
