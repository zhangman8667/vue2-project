export function timeCST (time) {
  //  time 格式为 'Fri Dec 12 2014 08:00:00 GMT+0800'
  if (time) {
    var d = new Date(time)
    var t = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
    return t
  }
}

export function getTime (day) {
  //  day 近几天的日期方法
  var date = {}
  var d = new Date()
  date.nowDay = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
  d.setDate(d.getDate() - day)
  date.startDay = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
  return date
}

export function getFixTime () {
  var now = new Date() // 当前日期
  var nowDayOfWeek = now.getDay() // 今天本周的第几天
  var nowDay = now.getDate() // 当前日
  var nowMonth = now.getMonth() // 当前月
  var nowYear = now.getYear() // 当前年
  nowYear += (nowYear < 2000) ? 1900 : 0

  var lastMonthDate = new Date() // 上月日期
  lastMonthDate.setDate(1)
  lastMonthDate.setMonth(lastMonthDate.getMonth() - 1)
  // var lastYear = lastMonthDate.getYear()
  var lastMonth = lastMonthDate.getMonth()

  // 格式化日期：yyyy-MM-dd
  function formatDate (date) {
    var myyear = date.getFullYear()
    var mymonth = date.getMonth() + 1
    var myweekday = date.getDate()

    if (mymonth < 10) {
      mymonth = '0' + mymonth
    }
    if (myweekday < 10) {
      myweekday = '0' + myweekday
    }
    return (myyear + '-' + mymonth + '-' + myweekday)
  }

  // 获得某月的天数
  function getMonthDays (myMonth) {
    var monthStartDate = new Date(nowYear, myMonth, 1)
    var monthEndDate = new Date(nowYear, myMonth + 1, 1)
    var days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24)
    return days
  }
  // 今天
  var getCurrentDate = new Date(nowYear, nowMonth, nowDay)
  getCurrentDate = formatDate(getCurrentDate)
  // console.log(getCurrentDate + '-------今天')
  // 昨天
  var getYesterdayDate = new Date(nowYear, nowMonth, nowDay - 1)
  getYesterdayDate = formatDate(getYesterdayDate)
  // console.log(getYesterdayDate + '-------昨天')
  // 获得本周的开始日期
  var getWeekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek)
  getWeekStartDate = formatDate(getWeekStartDate)
  // console.log(getWeekStartDate + '-------获得本周的开始日期')
    // 获得本周的结束日期
  var getWeekEndDate = new Date(nowYear, nowMonth, nowDay + (6 - nowDayOfWeek))
  getWeekEndDate = formatDate(getWeekEndDate)
  // console.log(getWeekEndDate + '-------获得本周的结束日期')

  // 获得上周的开始日期
  var getUpWeekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek - 7)
  getUpWeekStartDate = formatDate(getUpWeekStartDate)
  // console.log(getUpWeekStartDate + '-------获得上周的开始日期')
  // 获得上周的结束日期
  var getUpWeekEndDate = new Date(nowYear, nowMonth, nowDay + (6 - nowDayOfWeek - 7))
  getUpWeekEndDate = formatDate(getUpWeekEndDate)
  // console.log(getUpWeekEndDate + '-------获得上周的结束日期')

  // 获得本月的开始日期
  var getMonthStartDate = new Date(nowYear, nowMonth, 1)
  getMonthStartDate = formatDate(getMonthStartDate)
  // console.log(getMonthStartDate + '-------获得本月的开始日期')

  // 获得本月的结束日期
  var getMonthEndDate = new Date(nowYear, nowMonth, getMonthDays(nowMonth))
  getMonthEndDate = formatDate(getMonthEndDate)
  // console.log(getMonthEndDate + '-------获得本月的结束日期')

  // 获得上月开始时间
  var getLastMonthStartDate = new Date(nowYear, lastMonth, 1)
  getLastMonthStartDate = formatDate(getLastMonthStartDate)
  // console.log(getLastMonthStartDate + '-------获得上月开始时间')

  // 获得上月结束时间
  var getLastMonthEndDate = new Date(nowYear, lastMonth, getMonthDays(lastMonth))
  getLastMonthEndDate = formatDate(getLastMonthEndDate)
  // console.log(getLastMonthEndDate + '-------获得上月结束时间')
  var fixTime = {
    currentDate: getCurrentDate,
    yesterdayDate: getYesterdayDate,
    weekStartDate: getWeekStartDate,
    weekEndDate: getWeekEndDate,
    upWeekStartDate: getUpWeekStartDate,
    upWeekEndDate: getUpWeekEndDate,
    monthStartDate: getMonthStartDate,
    monthEndDate: getMonthEndDate,
    lastMonthStartDate: getLastMonthStartDate,
    lastMonthEndDate: getLastMonthEndDate
  }
  return fixTime
}
