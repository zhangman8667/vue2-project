import $ from 'jquery'
import { Notifiy } from './toast'

var httpBasic = function (type) {
  return function (opts) {
    var localStorage = window.localStorage
    if (localStorage && localStorage.userInfo) {
      var userInfo = JSON.parse(localStorage.userInfo)
      opts.params.uid = userInfo.uid
    }
    var url = opts.url
    $[type]({
      url: url,
      data: opts.params,
      dataType: 'json',
      xhrFields: {
        withCredentials: true
      },
      success: function (res) {
        if (res.code === '0') {
          opts.success && opts.success(res)
        } else if (res.message) {
          Notifiy('错误', res.message, 'error')
        } else {
          Notifiy('错误', '请求出错', 'error')
        }
      },
      error: function (err) {
        opts.error && opts.error(err)
      },
      complete: function (XMLHttpRequest, status) {
        if (status === 'timeout' && !opts.noToast) {
          Notifiy('错误', '请求超时', 'error')
        } else if (status === 'error') {
          if (XMLHttpRequest && XMLHttpRequest.statusText === 'error' && !opts.noToast) {
            Notifiy('错误', '网络状况不佳，请检查网络', 'error')
          }
        }
        opts.complete && opts.complete(status)
      }
    })
  }
}

var httpGet = httpBasic('get')
var httpPost = httpBasic('post')

export {
  httpGet,
  httpPost
}
