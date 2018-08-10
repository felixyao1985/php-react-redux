import CONST from './const.js';

//-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
//-* CONST
//-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-


export function getDomainList() {
  return {
    types: [CONST.SEND, CONST.GET_LIST, CONST.ERROR, CONST.FAIL],
    promise: function(){
		return new Promise((resolve, reject) => {

			let dataSource = [{
			  id: '1',
			  name: '潍坊敬老院',
			  address: '西湖区湖底公园1号'
			}, {
			  id: '2',
			  name: '东安养老院',
			  address: '西湖区湖底公园1号'
			}];

			var res = {}
			var response = {};
			response.data = dataSource;
			response.code = 0;
			res.response = response;
			resolve(res);
		}); 
	}
  };
}