var Words = require('../models/words.js')

exports.index = function(req, res) {
  console.log("index_index")
  res.render('index');
};
exports.mongogw = function(req, res) {
  var gw = req.query.words;
  console.log("words",gw)
  if(gw){
    var qs=new RegExp('^'+gw);
  }else{
    var qs=''
  }
  console.log("RegExp",qs)

  Words.where('word',qs).exec(function(error, data){
     console.log("data",data)
    res.json(data);
  });
/*  Words.find({word:gw}, 'word', function(error, data) {
  console.log("data",data)
    res.json(data);
  });
};*/
}
exports.mongoiw = function(req, res) {
  var iw = req.query.words;
  console.log("input words",iw)
  var w = new Words({word:iw})
  w.save(function(err){
    if(err){
      console.log('save ERR!',err)
    }else{
      res.json({status:200});
    }
  })
};

exports.redisgw = function(req, res) {
  var gw = req.query.words;
  console.log("words",words)

  Words.find({word:gw}, 'word', function(error, data) {
    res.json(data);
  });
/*
  var ar = [
    {'value':words+'1'},
    {'value':words+'2'},
    {'value':words+'3'},
    {'value':words+'4'},
  ]
  res.json(ar);*/
};
exports.redisiw = function(req, res) {
  var iw = req.query.words;
  console.log("words",iw)
  var w = new Words({word:iw})
  w.save(function(err){
    if(err){
      console.log('save ERR!',err)
    }else{
      res.json({status:200});
    }
  })

  /*var ar = [
    {'value':words+'1'},
    {'value':words+'2'},
    {'value':words+'3'},
    {'value':words+'4'},
  ]*/
  /*res.json(ar);*/
};