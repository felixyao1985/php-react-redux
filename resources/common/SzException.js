let SzLib = require('./SzLib');

let SzException = {
  /**
   * Handle error.
   *
   * @param {Object} err
   * {
   *  err:xhr.responseText,
   *  statusCode:xhr.status
   * }
   * @return {void}
   */
  handleError(err) {
    let message = this.getExMsg(err);
    console.error('Loading failed! Msg:' + message, err);
  },

  /**
   * Get formatted exception message.
   *
   * @param {Object} err
   * {
   *  err:xhr.responseText,
   *  statusCode:xhr.status
   * }
   * @return {String}
   */
  getExMsg(err) {
    let message = '';
    if (!err.hasOwnProperty('statusCode')) {
      message = 'Error code not defined! response:' + err.toString();
    } else {
      SzLib.showErrorDialog(SzLib.parseHttpCode(err.statusCode));
      message = err.err;
    }

    return message;
  }
};

module.exports = SzException;
