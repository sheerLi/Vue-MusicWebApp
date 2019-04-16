import jsonp from 'common/js/jsonp.js'
import {commonParams,options} from 'api/config.js'
import axios from 'axios'
export function getRecommend(){
  const url = "https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg";
  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    needNewCode: 1,
    uin: 0
  })
  return jsonp(url,data,options)
} 

export function getDiscList(){
  const url = "/api/getDiscList"
  const data = Object.assign({}, commonParams, {
    picmid: 1,
    platform: 'yqq.json',
    hostUin: 0,
    needNewCode: 0,
    categoryId: 10000000,
    notice: 0,
    sortId: 5,
    sin: 0,
    ein: 29,
    rnd: Math.random(),
    format: 'json'
  })
  return axios.get(url,{
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getSongList(disstid) {
  const url = '/api/getSongList'

  const data = Object.assign({}, commonParams, {
    disstid,
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: 0,
    platform: 'yqq.json',
    hostUin: 0,
    needNewCode: 0
  })

  return axios.get(url, {
    params: data
  }).then(res => {
    return Promise.resolve(res.data)
  })
}