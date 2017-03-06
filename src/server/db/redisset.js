var redis = require('redis');
/*数据库连接信息host,port,user,pwd,dbname(可查询数据库详情页)*/
var username = 'dc83cfc97573454b86b2e5b198aaaebe';  //用户AK
var password = '99a5cb920e874d31a72550219b9e42b9';  //用户SK
var db_host = 'redis.duapp.com';
var db_port = 80;
var db_name = 'redistest';   //数据库名称
console.log(db_host);
console.log(db_port);
var options = {"no_ready_check":true};

function Redisreq(req, res) {
  var client = redis.createClient(db_port, db_host, options);
  client.on("error", function (err) {
    console.log("Error " + err);
  });

  // 建立连接后，在进行集合操作前，需要先进行auth验证

  client.auth(username + '-' + password + '-' + db_name);

  client.set('baidu', 'welcome to BAE');

  client.get('baidu', function(err, result) {
    if (err) {
      console.log(err);
      res.end('get error');
      return;
    }
    res.end('result: ' + result);
  });
}

function getRedisStr(){

}
function returnclient(){
  var client = redis.createClient(db_port, db_host, options);
  client.auth(username + '-' + password + '-' + db_name);
  return client;
}
function returnlocalclient(){
  var client = redis.createClient(6379, "127.0.0.1", options);
  return client;
}
testRedis={
  testRedisreq:Redisreq,
  returnclient:returnclient,
  returnlocalclient:returnlocalclient
  }

module.exports = testRedis;