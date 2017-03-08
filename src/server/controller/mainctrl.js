var Words = require('../models/words.js')
var testRedis = require('../db/redisset')
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
};
exports.redisiw = function(req, res) {
  /*console.log('req.session.user=',req.session.user)
  console.log('req.session=',req.session)*/
  req.session.rr={account:'dfsfsfdf',password:'rtrrt'}
  console.log('req.session=',req.session)
  /*var iw = req.query.words;
  console.log('iw')
  var c = testRedis.returnclient()
  c.set('baidu', 'welcome to BAE');
  c.get('baidu', function(err, data){
    console.log(data)
    c.get('baidu', function(err, result){
      res.json({'result':result})
    })
  });*/
};
exports.sess = function(req, res) {
  var u = req.session.rr
  /*console.log('u=',req.session.user)*/
  console.log('req.session=',req.session)
  res.json(u)
};