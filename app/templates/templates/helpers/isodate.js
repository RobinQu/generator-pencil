module.exports = function(d) {
  try {
    return d.toISOString();
  } catch(e) {
    return (new Date()).toISOString();
  }
};