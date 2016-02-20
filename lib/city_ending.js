module.exports = function( city ) {
  var ending = city.substr(-3);
  if (ending === 'tle') {
    return city + 'ite';
  } else if (ending === 'and') {
    return city + 'ian';
  } else if (ending === 'ork') {
    return city + 'er';
  } else {
    return city + 'ian';
  }
};
