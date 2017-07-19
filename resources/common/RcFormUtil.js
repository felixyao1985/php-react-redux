let SzLib = require('./SzLib');
let SzException = require('./SzException');

let RcFormUtil = {

  /**
   * RC-FORM
   * 获取表单中字段的错误id
   *
   * @param {Object} rcForm
   * @param {Array} fields, eg:['Account', 'Password']
   * @return {Array}
   */
  getAllFieldError(rcForm, fields) {
    let fieldErrorCode = fields.map((value) => {
      let fieldError = rcForm.getFieldError(value);
      if (fieldError == undefined) {
        return [];
      }

      return fieldError;
    });

    let errorCode = [];
    for (let key in fieldErrorCode ) {
      if ( !fieldErrorCode.hasOwnProperty(key) ) {
        continue;
      }
      errorCode.push(...fieldErrorCode[key]);
    }
    return errorCode
  },

  /**
   * Promise请求预处理
   */
  prePromiseHandler() {
    // do nothing
  },

  /**
   * 获取表单组件的值
   *
   * @params {Object} refs
   * @params {String} refName
   * @return {String}
   */
  getFormValue(refs, refName) {
    if (!refs.hasOwnProperty(refName)) {
      return null
    }

    return refs[refName].value
  },

  /**
   * Promise请求后处理
   *
   * @params {Object} res
   * @params {Object} rcForm
   * <pre>
   *   Succeed: { response: { status: 0, senior: {} }, type: 'Error Message Error' }
   *   Failed：{ type: 'FAIL', error: 'Error Message String '}、
   * </pre>
   * @params {Function} onSuccess
   * @params {Function} onError
   */
  postPromiseHandler(res, rcForm = null, fieldName = null, onSuccess = () => {},  onError = () => {}) {
    // handle FAIL Error
    if (res.type == 'FAIL') {
      SzException.handleError(res.error);
      onError(res);
      return;
    }

    if (res.response.status == 0) {
      onSuccess(res);
    } else {
      if (!fieldName || !rcForm) {
        onError(res);
        return;
      }
      this.handleFieldError(res, rcForm, fieldName, onError); // handle error
    }
  },

  handleFieldError(res, rcForm = null, fieldName = null, onError = () => {}) {
    const field = {};
    field[fieldName] = {
      value: rcForm.getFieldValue(fieldName),
      errors: [new Error(res.response.status)]
    };
    rcForm.setFields(field);
    onError(res);
  }
};

module.exports = RcFormUtil;