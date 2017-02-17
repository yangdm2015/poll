var mongoose = require('mongoose');
var mongoset = require('../db/mongoset')
var WordSchema = new mongoose.Schema({
  word:String
});
/*
var Words = mongoose.model('Words',WordSchema)*/
var Words = mongoset.db.model('Words',WordSchema)
module.exports = Words