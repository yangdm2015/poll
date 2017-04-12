var users2socket = [];
exports.getSessionId = getSessionId;
exports.addUser = addUser;
exports.setUserSocket = setUserSocket;
exports.findUserBySessionId = findUserBySessionId;
exports.findUserByUserId = findUserByUserId;
exports.getuserssocketarry = getuserssocketarry;
exports.sendMsg2UserById = sendMsg2UserById;

function getSessionId(cookieString, cookieName) {
    var matches = new RegExp(cookieName + '=([^;]+)(;|$)','gmi').exec(cookieString);
    return matches[1] ? matches[1] : null;
}
function addUser(name, account,session_id) {//添加用户
  var index = findInUsers(session_id);
  if (index === -1) //not exist
    users2socket.push({name: name,account:account, session_id: session_id, socket: null});
  else {
    if (users2socket[index].name !== name) //update name
        users2socket[index].name = name;
  }
}
function findInUsers(session_id) {//通过session_id查找
  var index = -1;
  for (var j = 0, len = users2socket.length; j < len; j++) {
    if (users2socket[j].session_id === session_id)
        index = j;
  }
  return index;
}
function findInUsersByName(name) {//通过session_id查找
  var index = -1;
  for (var j = 0, len = users2socket.length; j < len; j++) {
    console.log('此时name=',name,' 而users2socket[j].name=',users2socket[j].name)
    console.log('typeof name=',typeof name)
    if (users2socket[j].name === name)index = j;
    console.log('比较结果是users2socket[j].name === name：',users2socket[j].name === name,'index=',index)
  }
  return index;
}
function setUserSocket(session_id, socket){//更新用户socket
  /*console.log('这个链接对应的socket为：',socket)*/
    var index = findInUsers(session_id);
    if (index !== -1){
        users2socket[index].socket = socket;
    }
    /*console.log('新加入了用户，users2socket=',users2socket)*/
}
function findUserBySessionId(session_id) {//查找
    var index = findInUsers(session_id);
    return index > -1 ? users2socket[index] : null;
}
function findUserByUserId(name) {//查找
  var index = findInUsersByName(name);
  return index > -1 ? users2socket[index] : null;
}
function getuserssocketarry(){
  return users2socket;
}
function sendMsg2UserById(user_id,msg){
  /*console.log('将要给',user_id,"发消息！绝对路径是：",msg.abturl)*/
  /*console.log('进入了发送消息的函数此时的user_id是',user_id,' 而users2socket池为：',users2socket)*/
  var users2socketobj = findUserByUserId(user_id)
  if(users2socketobj){
    var toUserSocket = users2socketobj.socket;
    console.log('将要发送消息！')
    toUserSocket.emit('newmsg',msg)
    console.log('发送消息成功！')
  }else{
    console.log('消息发送对象不在线。')

  }

}