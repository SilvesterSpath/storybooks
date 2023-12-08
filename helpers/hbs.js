const moment = require('moment');

module.exports = {
  formatData: function (data) {
    return moment(data).format(format);
  },
};
