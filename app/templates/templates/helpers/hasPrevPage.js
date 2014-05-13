module.exports = function(options) {
  if(this.pagination.current > 1) {
    return options.fn(this);
  }
  return options.inverse(this);
};