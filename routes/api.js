var express = require('express');
var router = express.Router();
var User = require('../models/User');

/* GET home page. */
router.route('/user/checkemail').get( function(req, res, next) {
  User.findOne({
    email: req.query.email
  }, [], {

  }, function(err, user){
    if(err){
      next(err);
      return;
    }
    console.log( user );

    res.json({
      result: "success",
      data: (user == null) ? "not exist" : "exist"
    });
  });

});

module.exports = router;
