import Axios from './axios';

const Service = {
  // 登录接口
  loginUser: data => Axios.post('/user/signin', data),
  // 注册接口
  RegisterUser: data => Axios.post('/user/signup', data),
  // 获取当前房间所有历史记录
  RoomHistoryAll: data => Axios.get('/history/message', {
    params: data
  }),
  // 清除房间所有历史记录
  RoomHistoryCleanAll: data => Axios.post('/history/cleanmessage', {
    params: data
  }),
  // 清楚房间指定历史记录
  RoomHistoryCleanOneMessage: data => Axios.post('/history/clearOnemessage', {
    params: data
  }),
  // 添加好友
  AddGoodFriends: data => Axios.post('/friends/addbuddy', data),
  // 获取好友列表
  GetFriendsList: () => Axios.get('/friends/friendslist'),
  // 机器人
  getRobotMessage: data => Axios.get('/robotapi', {
    params: data
  }),
  // 上传图片
  postUploadFile: data => Axios.post('/file/uploadimg', data, {
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  }),

  postUploadAvatar: data => Axios.post('/file/avatar', data, {
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  }),

  // 请求公告
  getNotice: () => Axios.get('https://s3.qiufengh.com/config/notice-config.js')
};

export default Service;

