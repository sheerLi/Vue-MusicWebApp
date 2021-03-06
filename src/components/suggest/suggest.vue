<template>
  <Scroll class="suggest" ref="suggest" :data="list" :beforeScroll="beforeScroll" @beforeScroll="listScroll" :pullUp="pullup" @scrollToEnd="searchMore">
    <ul class="suggest-list">
      <li class="suggest-item" @click="itemSelect(item)" v-for="(item, index) in list" :key="index">
        <div class="icon">
          <i class="iconfont" :class="getIconCls(item)"></i>
        </div>
        <div class="name">
          <p class="text" v-html="getDisplayName(item)"></p>
        </div>
      </li>
      <loading v-show="hasMore" title=""></loading>
    </ul>
    <div class="no-result-wrapper">
      <no-result v-show="!hasMore && !list.length" title="抱歉，暂无搜索数据"></no-result>
    </div>
  </Scroll>
</template>

<script>
import {getSearchResult} from 'api/search'
import {ERR_OK} from 'api/config'
import {getSongVkey} from 'api/vkey'
import {createSongList} from 'common/js/song'
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import NoResult from 'base/no-result/no-result.vue'
import {Singer} from 'common/js/singer'
import {mapMutations, mapActions} from 'vuex'

const TYPE_SINGER = 'singer'
const perpage = 20
export default {
  props: {
    query: {
      type:　String,
      default: ''
    },
    showSinger: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      page: 1,
      list: [],
      pullup: true,
      beforeScroll: true,
      hasMore: true,

    }
  },
  methods: {
    listScroll() {
      this.$emit('listScroll')
    },
    refresh() {
      this.$refs.suggest.refresh()
    },
    search() {
      this.hasMore = true
      getSearchResult(this.showSinger, this.page, this.query, perpage).then((res) => {
        if(res.code === ERR_OK) {
          this.list = this._genList(res.data)
          
          this._checkMore(res.data)
        }
      })
    },
    searchMore() {
      if(!this.hasMore){
        return
      }
      this.page ++
      // this.showSinger = false
      getSearchResult(this.showSinger, this.page, this.query, perpage).then((res) => {
        if(res.code === ERR_OK) {
          let more = []
          more = this._genList(res.data)
          setTimeout(() => {
            this.list = this.list.concat(more) 
          }, 1000)        
          this._checkMore(res.data)
        }
      })
    },
    _checkMore(data) {
      const songs = data.song
      if(!songs.list.length || (songs.curnum + songs.curpage * perpage) > songs.totalnum) {
        this.hasMore = false
      }
    },
    getIconCls(item){
      if(item.type === TYPE_SINGER) {
        return 'icon-singer'
      } else {
        return 'icon-music'
      }
    },
    itemSelect(item) {
      if(item.type === TYPE_SINGER) {
        const singer = new Singer(item.singermid, item.singername)
        this.$router.push({
          path: `/search/${singer.id}`
        })
        this.setSinger(singer)
      } else {
        this.insertSong(item)
      }
      this.$emit('select')
    },
    getDisplayName(item){
      if(item.type === TYPE_SINGER) {
        return item.singername
      } else {
        return `${item.songName}-${item.singer}`
      }
    },
    _genList(data) {
      let ret = []
      if(data.zhida && data.zhida.singerid) {
        ret.push({...data.zhida, ...{type: TYPE_SINGER}})
      }
      if(data.song){
        let arr = this._normalizeSongs(data.song.list, ret)
        return arr;     
      }      
    },
    _normalizeSongs(list, singerList) {
      // let ret = []
      list.forEach((musicData) => {
        if(musicData.songid && musicData.albumid) {
          // ret.push(createSongList(musicData, '533405C31AFAFF3668CB644571BE91835C46563807D916EA28BD99B38F30F5112D6D7851695E39B457AFA495C77C8C8613A036ACBB834E6D'))
          getSongVkey(musicData.songmid).then((res) => {
            const songVkey = res.data.items[0].vkey
            singerList.push(createSongList(musicData, songVkey))     
          })
        }
      })
      return singerList
    },
    ...mapMutations({
      setSinger: 'SET_SINGER'
    }),
    ...mapActions([
      'insertSong'
    ])
  },
  
  components: {
    Scroll,
    Loading,
    NoResult
  },
  watch: {
    query() {
      this.search()
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~common/scss/variable";
  @import "~common/scss/mixin";
  .suggest{
    height: 100%;
    overflow: hidden;
    .suggest-list{
      padding: 0 30px;
      .suggest-item{
        display: flex;
        align-items: center;
        padding-bottom: 20px;
      }
      .icon{
        flex: 0 0 30px;
        width: 30px;
        [class^="icon-"]{
          font-size: 14px;
          color: $color-text-g;
        }
      }
      .name{
        flex: 1;
        overflow: hidden;
        .text{
          @include no-wrap()
        }
      }
    }
    .no-result-wrapper{
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%)
    }
  }
</style>

