import {getLyric} from 'api/song.js'
import {ERR_OK} from 'api/config'
import {Base64} from 'js-base64'
export default class Song{
  constructor({id, songName, mid, singer, album, duration, image, url}){
    this.id = id,
    this.songName = songName,
    this.singer = singer,
    this.mid = mid,
    this.duration = duration,
    this.album = album,
    this.image = image,
    this.url = url
  }
  getLyric() {
    if(this.lyric) {
      return Promise.resolve(this.lyric)
    }
    return new Promise((resolve, reject) => {
      getLyric(this.mid).then((res) => {
        if(res.retcode === ERR_OK){
          this.lyric = Base64.decode(res.lyric)
          // console.log(this.lyric)
          resolve(this.lyric)
        } else {
          reject('no lyric')
        }
      })
    })
    
  }
}

export function createSongList(song){
  return new Song({
    id: song.songid,
    songName: song.songname,
    mid: song.songmid,
    singer: singerName(song.singer),
    album: song.albumname,
    duration: song.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${song.albummid}.jpg?max_age=2592000`,
    url: `https://api.bzqll.com/music/tencent/url?id=${song.songmid}&key=579621905&br=320`
  })
}

export function singerName(singer){
  let ret = []
  if(!singer){
    return ''
  }
  singer.forEach(item => {
    ret.push(item.name)
  });
  return ret.join('/')
}