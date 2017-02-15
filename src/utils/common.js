var trim = {
  allTrim: function (obj) {
    if (typeof (obj) === 'string') {
      return obj.replace(/(^\s*)|(\s*$)/g, '')
    }
  },
  ltrim: function (obj) {
    if (typeof (obj) === 'string') {
      return obj.replace(/(^\s*)/g, '')
    }
  },
  rtrim: function (obj) {
    if (typeof (obj) === 'string') {
      return obj.replace(/(\s*$)/g, '')
    }
  }
}

var myAuth = function (id) {
  var authlist = JSON.parse(window.sessionStorage.userAuthList)
  if (authlist.indexOf(id) > -1) {
    return true
  } else {
    return false
  }
}

export {trim, myAuth}
