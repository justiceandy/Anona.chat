var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var rooms = require('../modules/room');

/**
 * @api {get} /rooms
 * @apiName listRooms
 * @apiGroup Room
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *   {
 *      "rooms": [
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
router.get('/rooms', function(req, res) {
  rooms.list()
  .then(function(result){
    res.json(result);
  })
  .catch(function(err){
    res.send(err);
  });
});


module.exports = router;
