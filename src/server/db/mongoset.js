var mongoose = require('mongoose');
var sprintf = require("sprintf-js").sprintf;
/*var db = mongoose.createConnection();*/


var host, database, port, options;
var username='', pswd = '';
var isaly = false
if (isaly) {
    var host1="dds-m5e36f2073adceb41.mongodb.rds.aliyuncs.com"
    var port1=3717
    var host2="dds-m5e36f2073adceb42.mongodb.rds.aliyuncs.com"
    var port2=3717
    var database = 'test'
    var replSetName = "mgset-"
    var url=sprintf('mongodb://%s:%s@%s:%d,%s:%d/%s?options',username,pswd,host1,port1,host2,port2,database);
} else {
    host = 'localhost';
    /*database = 'remwords';*/
    database = 'test';
    port = 27017;
    /*port = 27019;*/
    /*var url=sprintf('mongodb://%s:%s@%s:%d/%s',username,pswd,host,port,database);*/
    var url=sprintf('mongodb://%s:%s@%s:%d/%s',username,pswd,host,port,database);
}


module.exports = {
    db: mongoose.connection,
    init: function(){

            console.log('url=',url);
            if(isaly){
                db = mongoose.connect(url,{replset:{rs_name:replSetName}});
            }else{
                db = mongoose.connect(url);
            }
       /* db.on('error', function(err) {
            console.log("connect error 连接错误！");
            console.log(err);

        });
        db.on('disconnected', function() {
            db.open(host, database, port, options);
        });
        db.open(host, database, port, options);*/
    }
}