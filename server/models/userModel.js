const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  nickname: { type: String, required: true },
  UID: {type: String, unique: true, required: true}
});

module.exports = mongoose.model('Users', userSchema);