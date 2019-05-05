<template>
  <transition name="slide">
    <music-list :title="title" :bg-img="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
  import MusicList from 'components/music-list/music-list'
  import {getSongList} from 'api/recommend'
  import {ERR_OK} from 'api/config'
  import {getSongVkey} from 'api/vkey'
  import {mapGetters} from 'vuex'
  import {createSongList} from 'common/js/song'

  export default {
    computed: {
      title() {
        return this.disc.dissname
      },
      bgImage() {
        return this.disc.imgurl
      },
      ...mapGetters([
        'disc'
      ])
    },
    data() {
      return {
        songs: []
      }
    },
    created() {
      this._getSongList()
    },
    methods: {
      _getSongList() {
        if (!this.disc.dissid) {
          this.$router.push('/recommend')
          return
        }
        getSongList(this.disc.dissid).then((res) => {
          if (res.code === ERR_OK) {
            this.songs = this._normalizeSongs(res.cdlist[0].songlist)
          }
        })
      },
      _normalizeSongs(list) {
        let ret = []
        list.forEach((musicData) => {
          if (musicData.songid && musicData.albummid) {
            getSongVkey(musicData.songmid).then((res) => {
              const songVkey = res.data.items[0].vkey
              ret.push(createSongList(musicData, songVkey))
            })          
          }
        })
        return ret
      }
    },
    components: {
      MusicList
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  .slide-enter-active, .slide-leave-active{
    transition: all 0.3s;
  }
    
  .slide-enter, .slide-leave-to{
    transform: translate3d(100%, 0, 0)
  }
    
</style>