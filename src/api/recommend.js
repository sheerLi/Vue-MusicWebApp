import jsonp from 'common/js/jsonp.js'
import {commonParams,options,ERR_OK} from 'api/config.js'
export function getRecommend(){
  let url = "https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg";
  let data = Object.assign({},commonParams,{
    platform: 'h5',
    needNewCode: 1,
    uin: 0
  })
  return jsonp(url,data,options)
} 