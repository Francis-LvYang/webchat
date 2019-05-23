var mongoose = require('mongoose');

// 好友列表模型
var FriendSchema = new mongoose.Schema({
  username: String,
  creatfriendtime: {
    type: Date,
    default: Date.now()
  }
});

FriendSchema.statics = {
  fetch: function (cb) {
    return this
      .find({})
      .sort('creatfriendtime')
      .exec(cb)
  },
  findById: function (name, cb) {
    return this
      .findOne({username: name})
      .exec(cb)
  }
};

module.exports = FriendSchema;
