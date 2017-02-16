var mongoose = require('mongoose');
var WordSchema = new mongoose.Schema({
  word:String
});
var Words = mongoose.model('Words',WordSchema)
module.exports = Words