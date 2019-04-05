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

function singerName(singer){
  let ret = []
  if(!singer){
    return ''
  }
  singer.forEach(item => {
    ret.push(item.name)
  });
  return ret.join('/')
}