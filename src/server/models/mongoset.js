var mongoose = require('mongoose');
var db = mongoose.createConnection();


var host, database, port, options;

if (process.env.SERVER_SOFTWARE == 'bae/3.0') {
    host = 'mongo.duapp.com';
    database = 'xFMmBeATEneTFKwVklWP';
    port = 8908;
    options = {
        server: {poolSize: 5},
        user: 'dc83cfc97573454b86b2e5b198aaaebe',
        pass: '99a5cb920e874d31a72550219b9e42b9',
    };
} else {
    host = 'localhost';
    database = 'pollsapp';
    port = 27017;
}


module.exports = {
    db: db,
    init: function(){
        db.on('error', function(err) {
            //do something..
            console.log("connect error");
        });
        //断线重连.
        db.on('disconnected', function() {
            db.open(host, database, port, options);
        });

        db.open(host, database, port, options);
    }
}

