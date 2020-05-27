const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
  uuid: {
    type: String
  },
  soeid: {
    type: String,
    required: true,
    default: true
  },
  activity: {
    type: String,
    trim: true,
  },
  result: {
    type: String
  },
  error: {
    type: String
  },
  comment: {
    type: String
  }
});

module.exports = mongoose.model('History', historySchema);
