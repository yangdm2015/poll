var redis = require('redis');
/*数据库连接信息host,port,user,pwd,dbname(可查询数据库详情页)*/
var username , password,db_host,db_port ,db_name, client,usernamepassword ;
var options ={"no_ready_check":true};

if (process.env.SERVER_SOFTWARE == 'bae/3.0') {
} else {
  client = redis.createClient(6379, "127.0.0.1",options);
    /*port = 27019;*/
}

function getRedisStr(){

}
function returnclient(){
  return client;
}
/*function returnlocalclient(){
  var client = redis.createClient(6379, "127.0.0.1", options);
  return client;
}*/
testRedis={
  returnclient:returnclient,
}
module.exports = testRedis;