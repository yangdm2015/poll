var mongoose = require('mongoose');
var mongoset = require('../db/mongoset')
var ObjectId = mongoose.Schema.Types.ObjectId;
var bcrypt = require('bcrypt-nodejs')
var SALT_WORK_FACTOR =10;
function c(str){console.log(str)}

var UserSchema = new mongoose.Schema({
  account:String,
  password:String,
  nickname:String,
  img_Url:String,
  signature:String,
  attended_v_num:Number,
  created_v_num:Number,
  replynum:Number,
  favor:[{
    poll:{type:ObjectId,ref:'Polls'},
    question:String,
    description:String,
    url:String,
    createAt:Date
  }],
  msgs:[{
    from: this,
    createAt:Date,
    img_Url:String,
    nickname:String,
    account:String,
    content:String,
    read:{type:Boolean,default:false},
    abturl:String
  }],
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
    console.log('this is new!')
    this.meta.createAt = this.meta.updateAt = Date.now()
    bcrypt.genSalt(SALT_WORK_FACTOR,function(err,salt){
      if(err) {return next(err)}
      bcrypt.hash(user.password,salt,null,function(err,hash){
          if(err) return next(err)
          user.password = hash
          next()
        })
    })
  }else{
    this.meta.updateAt = Date.now()
    next()
  }

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


