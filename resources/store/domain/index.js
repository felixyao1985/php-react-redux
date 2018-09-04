import objectAssign from 'object-assign'
import CONST from './const.js';
import utils from '../utils';
import { dataSchemas } from './models';

const now = new Date;
const isNode = typeof window === 'undefined';
const initialState = (!isNode && window.__INITIAL_STATE__.hasOwnProperty('data'))
  ? window.__INITIAL_STATE__.data
  : {
    dataList: [],
    dataDetail: {},
    count: 0
  };

export default function (state = initialState, action = {}) {
  const { response, extra } = action;

  let tmpDataDetail = state.dataDetail;
  switch (action.type) {
    //-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
    //-* DATE
    //-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
    case CONST.GET_LIST:
      return objectAssign({}, state, {
        dataList: utils.storeList(dataSchemas, null, response.data)
      });
    case CONST.Clear:
      return objectAssign({}, state, {
        dataList: []
      });
    case CONST.GET_DATA_DETAIL:
      tmpDataDetail[extra] = utils.store(dataSchemas, state.dataDetail[extra], response.data);
      return objectAssign({}, state, {
        dataDetail: tmpDataDetail
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
