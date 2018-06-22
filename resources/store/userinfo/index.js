import objectAssign from 'object-assign'
import CONST from './const.js';
import utils from '../utils';

const now = new Date;
const isNode = typeof window === 'undefined';
const initialState = (!isNode && window.__INITIAL_STATE__.hasOwnProperty('userinfo'))
  ? window.__INITIAL_STATE__.userinfo
  : {
    id:0,
    accountId:0,
    name:null,
    ticket:null,
    user_name:null,
    pwd:null,
    domainId:0,
    domainName:null
  };

export default function (state = initialState, action = {}) {
 
  const { response } = action;
  switch (action.type) {

    case CONST.GET_LoginInfo:
	  if(response.id==state.id) {
		  return state
		}else{
		  return objectAssign({}, state, {
			  id:response.id,
			  accountId:response.accountId,
			  name:response.name,
			  ticket:response.ticket,
			  user_name:response.user_name,
			  pwd:response.pwd,
			  domainId:response.domainId,
			  domainName:response.domainName
		  });
		}
    case CONST.SET_LoginInfo:
      return objectAssign({}, state, {
          id:response.id,
          accountId:response.accountId,
          name:response.name,
          ticket:response.ticket,
          user_name:response.user_name,
          pwd:response.pwd,
          domainId:response.domainId,
          domainName:response.domainName
      });
    //-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
    //-* ERROR && FAIL
    //-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
    case CONST.ERROR:
      // 接口错误，直接Alert
      return state;
    case CONST.FAIL:
      // 服务器错误，直接Alert
      console.log("ERROR:" + action.error);
      return state;
    default:
      return state;
  }
};
