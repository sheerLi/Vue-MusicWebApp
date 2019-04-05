import jsonp from 'common/js/jsonp.js'
import { commonParams, options } from 'api/config.js'

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

export function getSingerDetail(singerId) {
  const url = "https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg"
  const data = Object.assign({}, commonParams, {
    loginUin: 0,
    hostUin: 0,
    notice: 0,
    platform: 'yqq',
    needNewCode: 0,
    ct: 24,
    singermid: singerId,
    order: 'listen',
    begin: 0,
    num: 100,
  })
  return jsonp(url, data, options)
}