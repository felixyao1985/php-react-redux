import objectAssign from 'object-assign'
import { SzLib, Configs } from '../../common'
import CONST from './const.js';

const now = new Date;
const isNode = typeof window === 'undefined';
const initialState = (!isNode && window.__INITIAL_STATE__.hasOwnProperty('menu'))
    ? window.__INITIAL_STATE__.menu
    : {
        filter: null
    };

export default function (state = initialState, action = {}) {
    switch (action.type) {
        //-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
        //-* DATE
        //-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
        case CONST.SET_DailyRecordMenu:
            return objectAssign({}, state, {
                filter: action.filter
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
