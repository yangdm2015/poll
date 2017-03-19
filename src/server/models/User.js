var mongoose = require('mongoose');
var mongoset = require('../db/mongoset')
var bcrypt = require('bcrypt-nodejs')
var SALT_WORK_FACTOR =10;
function c(str){console.log(str)}
var UserSchema = new mongoose.Schema({
  account:String,
  password:String,
  meta:{
    createAt:{
      type:Date,
      dafault:Date.now()
    },
    updateAt:{
      type:Date,
      default:Date.now()
    }
  }
});
UserSchema.pre('save',function(next){
  var user = this
  if(this.isNew){
    this.meta.createAt = this.meta.updateAt = Date.now()
  }else{
    this.meta.updateAt = Date.now()
  }
  bcrypt.genSalt(SALT_WORK_FACTOR,function(err,salt){
    if(err) {return next(err)}
    bcrypt.hash(user.password,salt,null,function(err,hash){
        if(err) return next(err)
        user.password = hash
        next()
      })
  })
})
UserSchema.methods={
  comparePassword:function(_password,cb){
    bcrypt.compare(_password,this.password,function(err,isMatch){
      if(err){c('err!');c(err)}
      if(err)return cb(err)
        cb(null,isMatch)
    })
  }
}
var Users = mongoset.db.model('Users',UserSchema)
module.exports = Users


