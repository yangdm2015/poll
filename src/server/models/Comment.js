var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
var mongoset = require('../db/mongoset')

var CommentSchema = new Schema({
  poll:{type:ObjectId,ref:'Polls'},
  from:{type:ObjectId,ref:'Users'},
  /*reply:[this],*/
  reply:[{
    from:{type:ObjectId,ref:'Users'},
    to:{type:ObjectId,ref:'Users'},
    createAt:Date,
    img_Url:String,
    nickname:String,
    account:String,
    content:String
  }],
  tocreateuser:{type:ObjectId,ref:'Users'},
  to:{type:ObjectId,ref:'Users'},
  incomment:this,
  content:String,
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
})

CommentSchema.pre('save',function(next){
  if(this.isNew){
    this.meta.createAt = this.meta.updateAt = Date.now()
  }else{
    this.meta.updateAt = Date.now()
  }

  next()
})
CommentSchema.statics = {
  fetch: function(cb){
    return this
      .find({})
      .sort('meta.updateAt')
      .exec(cb)
  },
  findById: function(id,cb){
    return this
      .findOne({_id:id})
      .exec(cb)
  }
}

var Comment = mongoset.db.model('comments',CommentSchema)
module.exports = Comment
