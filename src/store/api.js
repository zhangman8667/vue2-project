const headerHttp = 'http://127.0.0.1:8086/static' //  服务器链接
var onlineApi = {
  nameList: 'data/name.json',
  resourcePost: 'data/post1.json',
  resourceGet: 'data/get1.json',
  ajaxPost: 'data/post2.json',
  ajaxGet: 'data/get2.json'
}

for (var i in onlineApi) {
  onlineApi[i] = headerHttp + '/' + onlineApi[i]
}
export default onlineApi
