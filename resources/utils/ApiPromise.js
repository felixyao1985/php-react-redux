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

        if (typeof promise !== 'function') {
          return next(action);
        }

        // Retreive the actions of different stages from the action object
        const [REQUEST, SUCCESS, ERROR, FAILURE] = types;

        // We first dispatch the REQUEST action
        next({ type: REQUEST, response: null, extra: extra });

        return promise(this)
          .then((result) => {
            const { response } = result;
            if (response.code == 0) {
              return dispatch({ type: SUCCESS, response: response, extra: extra })
            } else {
              return dispatch({ type: ERROR, response: response, extra: extra })
            }
          })
          .catch((error) => {
            console.error('API CLIENT MIDDLEWARE ERROR:', error);
            return dispatch({ type: 'FAIL', error: error, extra: extra });
          });
      }
    };
  }
}
