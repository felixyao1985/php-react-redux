import CONST from './const.js';

/*
export function getLoginInfo() {
  return {
    types: [CONST.SEND, CONST.GET_LoginInfo, CONST.ERROR, CONST.FAIL],
    promise: (client) => client.API('cors',[{"cmd":"loadSession"}])
  };
}
*/

/*
根据ApiPromise.js所定义的中间件执行方案，楼上这段 getLoginInfo() 的promise的执行逻辑如下
*/
export function getLoginInfo() {
  return {
    types: [CONST.SEND, CONST.GET_LoginInfo, CONST.ERROR, CONST.FAIL],
    promise: function(){
		return new Promise((resolve, reject) => {
			var res = {}
			res.response = {code:0,id:1,name:"felix"}
			resolve(res);
		}); 
	}
  };
}

export function Login(username,password,rememberMe = true) {
  var data = {};
  data.username		= username;
  data.password		= password;
  data.rememberMe	= rememberMe;
  data.cmd			= 'login';
  return {
    types: [CONST.SEND, CONST.SET_LoginInfo, CONST.ERROR, CONST.FAIL],
    promise: (client) => client.API('cors',[data])
  };
}


