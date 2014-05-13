var handlebars = require("handlebars");

module.exports = function() {
  return new handlebars.SafeString("/page/" + Math.min(this.pagination.total, this.pagination.current+1)) + "/";
};