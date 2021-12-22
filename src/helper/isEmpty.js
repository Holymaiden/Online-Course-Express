function isEmpty(obj) {
  if (
    obj === undefined ||
    !obj ||
    obj.length <= 0 ||
    Object.keys(obj).length === 0
  )
    return true;
  return false;
}

module.exports = isEmpty;
