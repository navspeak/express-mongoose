const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  sessionid: {
    type: String,
    required: true,
    index: true
  },
  userid: {
    type: String,
    required: true,
  },
  resource: {
    type: String,
  }
},
{
  timestamps: true
});


module.exports = mongoose.model('Session', sessionSchema);
