<template>
  <transition>
    <music-list :title="title" :songs="songs" :bgImg="bgImg"></music-list>
  </transition>
  
</template>

<script>
import {mapGetters} from 'vuex'
import {getSingerDetail} from 'api/singer.js'
import {ERR_OK} from 'api/config.js'
import {getSongVkey} from 'api/vkey.js'
import {createSongList} from 'common/js/song.js'
import MusicList from 'components/music-list/music-list'
export default {
  data(){
    return {
      songs: []
    }
  },
  computed: {
    title(){
      return this.singer.name
    },
    bgImg(){
      return this.singer.avatar
    },
    ...mapGetters([
      'singer'
    ])
  },
  created(){
    this._getDetail()
  },
  methods: {
    _getDetail() {
      if(!this.singer.id){
        this.$router.push('/singer')
        return
      }
      getSingerDetail(this.singer.id).then(res => {     
        if(res.code === ERR_OK){
          this.songs = this._formatSongList(res.data.list)
        }
      })
    },
    _formatSongList(list){
      let ret = []
      list.forEach(item => {
        let {musicData} = item
        if(musicData.songid && musicData.albumid){     
          getSongVkey(musicData.songmid).then((res) => {
            const songVkey = res.data.items[0].vkey
            ret.push(createSongList(musicData, songVkey))
          })        
        }
      });
      console.log(ret)
      return ret
    }
  },
  components: {
    MusicList
  }
}
</script>

<style lang="scss" scoped>
  @import "~common/scss/variable.scss";
  .singer-detail{
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: $color-background;
  }

  .v-leave-active, .v-enter-active{
    transition: all 0.3s
  }

  .v-enter, .v-leave-to{
    transform: translate3d(100%, 0, 0)
  }
  
</style>

