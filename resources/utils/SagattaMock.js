"use strict";

class SagittaClient {

  ajax (options) {
    options = options || {};
    options.type = (options.type || 'GET').toUpperCase();
    options.dataType = (options.dataType || 'json'). toLowerCase();
	
    const buildParam = (condition) => {
      let data = null;
      if (condition != null) {
        if (typeof condition == 'string') {
          data = condition;
        }
        if (typeof condition == 'object') {
          let arr = [];
          for (let dname in condition) {
            let dvalue = condition[dname];
            arr.push(encodeURIComponent(dname) + '=' + encodeURIComponent(dvalue));
          }
          data = arr.join('&');
        }
      }
      return data;
    };

    let url = options.url;
    let token;
    if (options.enableJWT === true && options.data.token) {
      token = options.data.token;
      delete options.data.token;
    }
    if (options.enableJWT === true && token == undefined) {
      return Promise.reject("token is missing");
    }

    let xhr;
    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest();
    } else {
      xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }
	xhr.withCredentials =  true;
	
    let params = buildParam(options.data);
    let res;
    return new Promise((resolve, reject) => {
      if (options.type == 'GET' || options.type == 'DELETE') {
        if (params !== null) {
          url = url + '?' + params;
        }
        xhr.open(options.type, url, true);
      } else if (options.type == 'POST' || options.type == 'PUT' || options.type == 'PATCH') {
        xhr.open(options.type, url, true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      }
      // enable jwt
      if (token) {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      }
	  xhr.setRequestHeader('Accept', 'application/json, text/javascript, */*; q=0.01');
      xhr.send(params);
		
      xhr.onreadystatechange = () => {
		  
        if (xhr.readyState == 4) {
		  
          let status = xhr.status;
          let response = xhr.responseText;
          if (status >= 200 && status < 300) {
            if (options.dataType == 'json') {
              response = JSON.parse(response);
            } else if (options.dataType == 'xml') {
              response = xhr.responseXML;
            }
            res = { response: response, statusText: xhr.statusText, statusCode: xhr.status };
		
            resolve(res);
          } else {
            reject(response);
          }
        }
      }

    });
  }

  cors(data) {
    let _this = this;
    let url   = 'http://localhost/careday/api/test.html';

    
    return new Promise((resolve, reject) => {
      _this.ajax({
        url:        url,
        type:       'POST',
        timeout:    5000,
        enableJWT:  false,
        data:       data
      })
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  }
}

export default new SagittaClient();