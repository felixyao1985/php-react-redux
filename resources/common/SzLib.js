import cookie from 'react-cookie'
import Configs from './Configs'
import i18n from './i18n'

//import dialog from 'uxcore-dialog'
const isNode = typeof window === 'undefined';

let SzLib = {
  i18n: {},

  /**
   * Load i18n config
   *
   * @params (String) locale
   * @return {{locale: *, i18n: *}}
   */
  loadLocale(locale = null) {
    this.i18n = i18n.get(locale);
    return {
      locale: locale,
      i18n: this.i18n
    };
  },

  /**
   * Get url param.
   *
   * @param {String} name the name of the param
   * @returns {String} param
   */
  getUrlParam(name) {
    if (typeof window === 'undefined') { return null; }
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    let r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
  },

  /**
   * Reload page.
   *
   * @return {void}
   */
  reloadPage() {
    if (typeof window === 'undefined') { return; }
    window.location.reload()
  },

  /**
   * Refresh page.
   *
   * @param {String} url
   * @return {void}
   */
  refreshPage(url) {
    if (typeof window === 'undefined') { return; }
    window.location.href = url;
  },

  /**
   * Log message.
   *
   * @param {String|Object} msg
   * @return {void}
   */
  log(msg) {
    if (Configs.DEFAULT.ENV == 'LIVE') {
      return;
    }

    if (typeof console == 'object') {
      if (typeof msg == 'string') {
        console.log(msg)
      } else {
        console.log(msg);
      }
    }
  },

  /**
   * Convert the first character of the given string to upper case
   *
   * @type {String} str
   * @return (String)
   */
  ucfirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  },

  /**
   * Uint8 array to string
   *
   * @param {Uint8Array} ua
   * @return {String}
   */
  byteArrayToString(ua) {
    let s = '';
    for (let i = 0; i < ua.length; i++) {
      s += String.fromCharCode(ua[i]);
    }
  },

  /**
   * String replace via argus
   *
   * @param {String} str
   * @param {Object} argus
   * @return {String}
   */
  strReplace(str, argus) {
    if (argus.length === 0) {
      return str;
    }

    for (let i = 0; i < argus.length; i++) {
      str = str.replace(/%s/, argus[i]);
    }

    return str;
  },

  /**
   * Get window protocol
   *
   * @return {String}
   */
  getWindowProtocol() {
    if (typeof window === 'undefined') { return null; }
    return window.location.protocol;
  },

  /**
   * Handle window resize
   *
   * @param {Function} handle
   */
  resizeHandle(handle) {
    if (typeof window === 'undefined') { return; }
    let resizeTimer;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(handle(), 500);
    });
  },

  isEmpty(obj) {
    if (obj == null || obj == undefined || obj == "") return true;
    if (obj.length > 0) return false;
    if (obj.length === 0)  return true;
    if (typeof obj == 'number' && obj > 0) return false;
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }

    return true;
  },

  formatDate(timestamp) {
    const date = new Date(timestamp * 1000);

    let month = date.getMonth() + 1;
    if (month >= 1 && month <= 9) {
      month = '0' + month;
    }

    let day = date.getDate();
    if (day >= 0 && day <= 9) {
      day = '0' + day;
    }

    return date.getFullYear() + '-' + month + '-' + day
      + ' ' + date.getHours() +  ':' + date.getMinutes()
      +  ':' + date.getSeconds();
  },

  dateToTimestamp(date) {
    return date.getTime() / 1000;
  },

  sprintf() {
    let arg = arguments;
    let str = arg[0] || '';
    let i, n;

    for (i = 1, n = arg.length; i < n; i++) {
      str = str.replace(/%s/, arg[i]);
    }

    return str;
  },

  validateEmail(email) {
    if (this.isEmpty(email)) {
      return false;
    }

    let regExp = /^([a-zA-Z0-9_\.-]+)@([\da-zA-Z0-9\.-]+)\.([a-zA-Z0-9\.]{2,6})$/;
    if (!email.match(regExp)) {
      return false;
    }

    return true;
  },

  validateMobile(mobile) {
    if (this.isEmpty(mobile)) {
      return false;
    }

    let regExp  = /^[0-9]{5,11}$/;
    if (!mobile.match(regExp)) {
      return false;
    }

    return true;
  },

  loadCookie(key, suffix = null) {

    if (suffix != null) {
      if (this.isEmpty(suffix)) {
        return null;
      }

      key = suffix + ':' + key;
    }

    return cookie.load(key);
  },

  saveCookie(key, value, suffix = null, expire = null) {

    let opt = {
      path: '/',
      expires: expire
    };

    if (suffix != null) {
      if (this.isEmpty(suffix)) {
        return null;
      }

      key = suffix + ':' + key;
    }

    return cookie.save(key, value, opt);
  },

  removeCookie(key, suffix = null) {

    let opt = {
      path: '/'
    };

    if (suffix != null) {
      if (this.isEmpty(suffix)) {
        return null;
      }

      key = suffix + ':' + key;
    }

    return cookie.remove(key, opt);
  },

  // showInfoDialog(content, onOk = () => {}) {
  //   let DialogText = this.i18n.Common.Dialog;
  //   dialog.info({
  //     title: DialogText.infoTitle,
  //     content: content,
  //     locale: 'en-us',
  //     onOk: onOk
  //   });
  // },
  //
  // showErrorDialog(content, onOk = () => {}) {
  //   let DialogText = this.i18n.Common.Dialog;
  //   dialog.error({
  //     title: DialogText.errorTitle,
  //     content: content,
  //     locale: 'en-us',
  //     onOk: onOk
  //   });
  // },
  //
  // showSuccessDialog(content, onOk = () => {}) {
  //   let DialogText = this.i18n.Common.Dialog;
  //   dialog.success({
  //     title: DialogText.successTitle,
  //     content: content,
  //     locale: 'en-us',
  //     onOk: onOk
  //   });
  // },

  parseHttpCode(httpCode) {
    let httpCodeList = this.i18n.HttpCode;
    if (httpCodeList.hasOwnProperty(httpCode)) {
      return httpCodeList[httpCode];
    }

    return httpCodeList.UNKNOWN;
  },

  parseErrCode(errorCode) {
    let errorCodeList = this.i18n.ErrCode;
    if (errorCodeList.hasOwnProperty(errorCode)) {
      return errorCodeList[errorCode];
    }

    return errorCodeList.UNKNOWN;
  },

  loadImage(imgName) {
    return isNode ? '/' + imgName : imgName;
  }
};

module.exports = SzLib;
