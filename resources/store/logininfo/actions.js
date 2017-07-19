import CONST from './const.js';

export function getLoginInfo() {
  return {
    types: [CONST.SEND, CONST.GET_LoginInfo, CONST.ERROR, CONST.FAIL],
    promise: (client) => client.API('cors',[{"cmd":"loadSession"}])
  };
}

export function setLoginInfo(username,password,rememberMe = true) {
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


