import Configs from '../Configs';

let i18n = {
  get(local) {
    let folderName = this.check(local);
    return {
      Common: require('./' + folderName + '/Common/Common'),
      HttpCode: require('./' + folderName + '/Common/HttpCode'),
      Options: require('./' + folderName + '/Common/Options'),
      App: {
        Home: require('./' + folderName + '/App/Home'),
        Data: require('./' + folderName + '/App/Data'),
        DataDetail: require('./' + folderName + '/App/DataDetail')
      }
    };
  },

  check(local) {
    switch (local) {
      case "zh_CN":
      case "en_US":
        return local;
      default:
        return Configs.DEFAULT.LOCALE;
    }
  },
};

module.exports = i18n;