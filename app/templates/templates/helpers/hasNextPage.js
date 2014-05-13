module.exports = function(options) {
  if(this.pagination.current < this.pagination.total) {
    return options.fn(this);
  }
  return options.inverse(this);
};