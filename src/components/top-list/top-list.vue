<template>
  <transition name="slide">
    <music-list :rank="rank" :title="title" :bg-img="bgImage" :songs="songs"></music-list>    
  </transition>
</template>

<script type="text/ecmascript-6">
  import MusicList from 'components/music-list/music-list'
  import {getMusicList} from 'api/rank'
  import {ERR_OK} from 'api/config'
  import {getSongVkey} from 'api/vkey'
  import {mapGetters} from 'vuex'
  import {createSongList} from 'common/js/song'

  export default {
    computed: {
      title() {
        return this.topList.topTitle
      },
      bgImage() {
        if (this.songs.length) {
          return this.songs[0].image
        }
        return ''
      },
      ...mapGetters([
        'topList'
      ])
    },
    data() {
      return {
        songs: [],
        rank: true
      }
    },
    created() {
      this._getMusicList()
    },
    methods: {
      _getMusicList() {
        if (!this.topList.id) {
          this.$router.push('/rank')
          return
        }
        getMusicList(this.topList.id).then((res) => {
          if (res.code === ERR_OK) {
            this.songs = this._normalizeSongs(res.songlist)
          }
        })
      },
      _normalizeSongs(list) {
        let ret = []
        list.forEach((item) => {
          const musicData = item.data
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
    transition: all 0.3s ease
  }
    
  .slide-enter, .slide-leave-to{
    transform: translate3d(100%, 0, 0)
  }
    
</style>