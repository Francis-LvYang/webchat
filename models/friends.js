var mongoose = require('mongoose');
var FriendSchema = require('../schemas/friendslist');
var Friend = mongoose.model('Friend', FriendSchema);

module.exports = Friend;
// 查找
// const findUser = (userInfo, callback) => {
//   Friend.findOne({username: userInfo}).then(res => {
//     if (res) {
//       callback(res);
//     } else {
//       callback(null)
//     }
//   }).catch(err => callback({error: err}))
// };
// 添加
// const insertFriend = (userInfo, callback) => {
//   let friends = new Friend({
//     username: userInfo.name
//   });
//   friends.save().then((err ,res) => {
//     if (err) {
//       callback(err);
//     } else {
//       callback(res);
//     }
//   })
// };
