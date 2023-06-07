// 登陆接口需要携带参数ts类型
export interface LoginForm {
  username: string;
  password: string;
}

interface dataType {
  token?: string; //登陆成功有token
  message?: string; //登陆失败有消息提示
}
//登陆接口返回数据类型
export interface LoginResponseData {
  code: number;
  data: dataType;
}

interface userInfo {
  userId: number;
  avatar: string;
  username: string;
  password: string;
  desc: string;
  roles: string[];
  buttons: string[];
  routes: string[];
  token: string;
}
interface user {
  checkUser: userInfo;
}
//定义服务器返回用户信息相关数据类型
export interface userResponseData {
  code: number;
  data: user;
}
