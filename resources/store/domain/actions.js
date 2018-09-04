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

			for(let i=3;i<100;i++) {
				let temp = {
				  id: i,
				  name: '潍坊敬老院'+i,
				  address: '西湖区湖底公园'+i+'号'
				}

				dataSource.push(temp);
			}

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

export function Clear() {
    return {
        type: CONST.Clear
    }
}

