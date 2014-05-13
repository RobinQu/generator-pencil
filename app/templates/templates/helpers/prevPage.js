var handlebars = require("handlebars");

module.exports = function() {
  return new handlebars.SafeString("/page/" + Math.max(this.pagination.current - 1, 1)) + "/";
};