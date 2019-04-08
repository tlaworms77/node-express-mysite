var express = require('express');
var router = express.Router();

/* GET home page. */
router.route('/').get( function(req, res, next) {
  console.log(req.session.authUser);
  res.render('main/index', null);
});

module.exports = router;
