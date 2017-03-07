var mongoose = require('mongoose');
var db = mongoose.createConnection();

var host, database, port, options;
if (process.env.SERVER_SOFTWARE == 'bae/3.0') {
    console.log("*********** process.env.SERVER_SOFTWARE == 'bae/3.0'")
    host = 'mongo.duapp.com';
    /*database = 'ncJpnNORbOeQMehbTXep';*/
    database = 'xFMmBeATEneTFKwVklWP';
    port = 8908;
    options = {
        server: {poolSize: 5},
       /* user: '0D3dd7950cbddde51845e4d353050c0a',
        pass: 'F77ecdb28b252895cef07290abec2360',*/
        user: 'dc83cfc97573454b86b2e5b198aaaebe',
        pass: '99a5cb920e874d31a72550219b9e42b9',
    };
} else {
    host = 'localhost';
    database = 'remwords';
    port = 27017;
    /*port = 27019;*/
}

module.exports = {
    db: db,
    init: function(){
         console.log("*************mongoset.init!!")
        db.on('error', function(err) {
            //do something..
            console.log("connect error 连接错误！");
        });
        //断线重连.
        db.on('disconnected', function() {
            db.open(host, database, port, options);
        });

        db.open(host, database, port, options);
    }
}