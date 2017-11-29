var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Vote = mongoose.model('Vote');

router.post('/voting', function(req,res,next) {
  var vote = new Vote(req.body);
  vote.save(function(err,vote) {
    if(err){return next(err);}
    res.json(vote);
  });
});

router.get('/voting', function(req,res,next) {
  Vote.find(function(err, vote) {
    if(err) {return next(err);}
    res.json(vote);
  });
});

router.param('vote', function(req, res, next, id) {
  var query = Vote.findById(id);
  query.exec(function (err, vote){
    if (err) { return next(err); }
    if (!vote) { return next(new Error("can't find vote")); }
    req.vote = vote;
    return next();
  });
});

router.get('/voting/:vote', function(req,res) {
  res.json(req.vote);
});

router.put('/voting/:vote/vote', function(req, res, next) {
  req.vote.vote(function(err, vote){
    if (err) { return next(err); }
    res.json(vote);
  });
});

router.delete('/voting/:vote', function(req, res) {
  console.log("in Delete");
  req.vote.remove();
  res.sendStatus(200);
});

module.exports = router;
