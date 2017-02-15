import { Notification } from 'element-ui'

export function toast (msg) {
  var htoast = document.getElementById('divToast')
  if (htoast) {
    htoast.remove()
  }
  var divToast = document.createElement('div')
  divToast.id = 'divToast'
  divToast.innerHTML = msg
  document.body.appendChild(divToast)
  setTimeout(function () {
    if (divToast) {
      divToast.remove()
    }
  }, 3000)
}

// type error|info|warning|success
export function Notifiy (title, msg, type) {
  Notification({
    title: title,
    message: msg,
    type: type
  })
}

export function loading () {
  // Loading.service()
  let _loading = `<div class='loading'>
                    <div class='cover'></div>
                    <div class='el-loading-mask is-fullscreen'>
                      <div class='el-loading-spinner'>
                        <svg viewBox='25 25 50 50' class='circular'>
                        <circle cx='50' cy='50' r='20' fill='none' class='path'>
                        </circle>
                        </svg>
                      </div>
                    </div>
                  </div>`
  let _div = document.getElementById('loading')
  _div.innerHTML = _loading
}

export function loadingHide () {
  let _div = document.getElementById('loading')
  _div.innerHTML = ''
}
