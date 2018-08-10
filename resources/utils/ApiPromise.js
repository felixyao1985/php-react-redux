import { SzLib } from '../common'
import sagitta from './SagattaMock.js';

export default class apiPromise {
  constructor() {
    this.API = (api, params) => {
      params = [...params];
      return sagitta[api](...params);
    };

    this.middleware = ({ dispatch, getState }) => {
      return next => action => {
        const { promise, types, extra } = action;
		//console.log("API promise action",action);
        if (typeof promise !== 'function') {
		  //如果promise不是一个方法 则直接dispatch数据流
          return next(action);
        }

        // Retreive the actions of different stages from the action object
        const [REQUEST, SUCCESS, ERROR, FAILURE] = types;

        // 先发dispatch 一个状态为REQUEST的Action 
		/*
		next(action) 执行一次dispatch
		REQUEST: 此处定义为先返回一个XX SEND的信息，告诉页面请求已发出。
		*/
        next({ type: REQUEST, response: null, extra: extra });
		//console.log('API CLIENT types:', types);
        return promise(this)
          .then((result) => {
            const { response } = result;

			if(response == null ) return dispatch({ type: FAILURE, error: 'response is null', extra: extra })
            if (response.code == 0) {
              return dispatch({ type: SUCCESS, response: response, extra: extra })
            } else {
              return dispatch({ type: ERROR, response: response, extra: extra })
            }
          })
          .catch((error) => {
            //console.error('API CLIENT MIDDLEWARE ERROR:', error);
            return dispatch({ type: 'FAIL', error: error, extra: extra });
          });
      }
    };
  }
}
