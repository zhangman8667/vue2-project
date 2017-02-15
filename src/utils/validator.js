import { Notifiy } from './toast.js'

// 正整数
export function isInteger (val) {
  return (/^(-?[1-9]\d*|0)$/.test(val))
}

// int型大于0
export function posinteger (val) {
  return /^[0-9]*[1-9][0-9]*$/.test(val)
}

// 包括0的正整数
export function Integer (val) {
  return /^0$|^\+?[1-9]\d*$/.test(val)
}

// 钱类型
export function posMoney (val) {
  return /^(0|[1-9][0-9]{0,9})(\.[0-9]{1,2})?$/.test(val)
}

// 手机号
export function vphone (val) {
  return /^1[34578]\d{9}$/.test(val)
}

// 手机号－带提示
export function vdPhone (val, text) {
  if (/^1[34578]\d{9}$/.test(val)) {
    return true
  } else {
    Notifiy('提示', '请输入正确的' + (!text ? '手机号' : text), 'info')
    return false
  }
}

// 邮箱－带提示
export function vdEmail (val, text) {
  if (/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(val)) {
    return true
  } else {
    Notifiy('提示', '请输入正确的' + (!text ? '邮箱' : text), 'info')
    return false
  }
}

// 邮箱
export function vemail (val) {
  return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(val)
}

// 6-20位数字和字母组合
export function enAndZn (val) {
  return /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/.test(val)
}
// 4-20位英文和字母组合
export function enAndZnFour (val) {
  return /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{4,20}$/.test(val)
}

export function removeArray (val) {
  var index = this.indexOf(val)
  if (index > -1) {
    this.splice(index, 1)
  }
}

// export default validator
