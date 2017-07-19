import objectAssign from 'object-assign'
import { SzLib, Configs } from '../../common'
import CONST from './const.js';

const now = new Date;
const isNode = typeof window === 'undefined';
const initialState = (!isNode && window.__INITIAL_STATE__.hasOwnProperty('base'))
  ? window.__INITIAL_STATE__.base
  : {
    i18n: null,
    locale: SzLib.loadCookie('locale') || Configs.DEFAULT.LOCALE
  };

export default function (state = initialState, action = {}) {
  switch (action.type) {
    //-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
    //-* DATE
    //-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
    case CONST.SET_LANGUAGE:
      SzLib.saveCookie('locale', action.locale);

      return objectAssign({}, state, {
        locale: action.locale,
        i18n: action.i18n
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
