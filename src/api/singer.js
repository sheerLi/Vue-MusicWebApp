import jsonp from 'common/js/jsonp.js'
import {commonParams,options} from 'api/config.js'

export function getSingerList() {
  const url = "https://c.y.qq.com/v8/fcg-bin/v8.fcg";
  const data = Object.assign({}, commonParams, {
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pageSize: 100,
    pagenum: 1,
    loginUin: 0,
    hostUin: 0,
    notice: 0,
    platform: 'yqq.json',
    needNewCode: 0
  })
  return jsonp(url, data, options)
}