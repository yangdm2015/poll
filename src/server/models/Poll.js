var mongoose = require('mongoose');
var voteSchema = new mongoose.Schema({ ip: 'String' });
var mongoset = require('../db/mongoset')
var choiceSchema = new mongoose.Schema({
  text: String,
  img_Url:String,
  votes: [voteSchema]
});
PollSchema = new mongoose.Schema({
  question: { type: String, required: true },
  description:String,
  img_Url:String,
  created_user:String,
  created_time:Date,
  begin_time:Date,
  end_time:Date,
  allow_muti_choice:Boolean,
  max_chosen_num:Number,
  serial:Number,
  key_required:Boolean,
  choices: [choiceSchema],
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
PollSchema.pre('save',function(next){
  var Poll = this
  if(this.isNew){
    this.meta.createAt = this.meta.updateAt = Date.now()
  }else{
    this.meta.updateAt = Date.now()
  }
  next()
})
var Poll = mongoset.db.model('polls',PollSchema)
module.exports = Poll
