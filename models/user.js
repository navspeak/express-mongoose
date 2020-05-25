const mongoose = require('mongoose');
const roles = require('./roles');

const regexSoeid = /^[a-z]{2}[\d]{5}$/;

const userSchema = new mongoose.Schema({
  soeid: {
    type: String,
    required: true,
    match: regexSoeid
  },
  enabled: {
    type: Boolean,
    required: true,
    default: true
  },
  roles: {
    type: String,
    trim: true,
    enum: roles,
    default: 'none'
  }
},
{
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
