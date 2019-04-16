<template>
  <div class="music-list">
    <div class="header">
      <div class="back" @click="back">
        <i class="iconfont icon-back"></i>
      </div>
      <h1 class="title" v-html="title"></h1>
    </div>
    <div class="bg-img" :style="bgStyle" ref="bgImg">
      <div class="play-wrapper">
        <div ref="playBtn" v-show="songs.length>0" class="play">
          <i class="iconfont icon-stop icon-play"></i>
          <span class="text">随机播放全部</span>
        </div>
      </div>
      <div class="filter" ref="filter"></div>
    </div>
    <div class="bg-layer" ref="layer"></div>
    <Scroll
      @scroll="scroll"
      :probeType="probeType"
      :listenScroll="listenScroll"
      :data="songs"
      class="list"
      ref="list"
    >
      <div class="song-list-wrapper">
        <song-list @select="selectItem" :rank="rank" :songs="songs"></song-list>
      </div>
      <div v-show="!songs.length" class="loading-container">
        <loading></loading>
      </div>
    </Scroll>
  </div>
</template>

<script>
import SongList from "base/song-list/song-list";
import Scroll from "base/scroll/scroll";
import {prefixStyle} from "common/js/dom";
import Loading from 'base/loading/loading'
import {mapActions} from 'vuex'
import {playlistMixin} from 'common/js/mixin'

const RESERVED_HEIGHT = 40
const transform = prefixStyle('transform')
const backdrop = prefixStyle('backdrop-filter')
export default {
  mixins: [playlistMixin],
  props: {
    bgImg: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    },
    songs: {
      type: Array,
      default: []
    },
    rank: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scrollY: 0
    };
  },
  computed: {
    bgStyle() {
      return `background-image: url(${this.bgImg})`;
    }
  },
  watch: {
    scrollY(newY) {
      let tranlateY = Math.max(this.minTranslateY, newY);
      let zIndex = 0;
      let scale = 1;
      let blur = 0;
      this.$refs.layer.style[transform] = `translate3d(0, ${tranlateY}px, 0)`;
      const percent = Math.abs(newY / this.imageHeight);
      if (newY > 0) {
        scale = 1 + percent;
        zIndex = 10;
      } else {
        blur = Math.min(20, percent * 20);
      }
      this.$refs.filter.style[backdrop] = `blur(${blur}px)`
      if (newY < this.minTranslateY) {
        zIndex = 10;
        this.$refs.bgImg.style.paddingTop = 0;
        this.$refs.bgImg.style.height = `${RESERVED_HEIGHT}px`;
        this.$refs.playBtn.style.display = "none"
      } else {
        this.$refs.bgImg.style.paddingTop = "70%";
        this.$refs.bgImg.style.height = 0;
        this.$refs.playBtn.style.display = ""
      }
      this.$refs.bgImg.style[transform] = `scale(${scale})`   
      this.$refs.bgImg.style.zIndex = zIndex;
    }
  },
  created() {
    this.probeType = 3;
    this.listenScroll = true;
  },
  mounted() {
    this.imageHeight = this.$refs.bgImg.clientHeight;
    this.minTranslateY = -this.imageHeight + RESERVED_HEIGHT;
    this.$refs.list.$el.style.top = `${this.imageHeight}px`;
  },
  methods: {
    handlePlaylist(playlist) {
      const bottom = playlist.length > 0 ? '60px' : ''
      this.$refs.list.$el.style.bottom = bottom
      this.$refs.list.refresh()
    },
    scroll(pos) {
      this.scrollY = pos.y;
    },
    back(){
      this.$router.back()
    },
    selectItem(item, index){
      this.selectPlay({
        list: this.songs,
        index
      })
    },
    ...mapActions([
      'selectPlay'
    ])
  },
  components: {
    SongList,
    Scroll,
    Loading
  }
};
</script>

<style lang="scss" scoped>
@import "~common/scss/variable.scss";
@import "~common/scss/mixin.scss";
.music-list {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: $color-background;
  .header {
    position: fixed;
    top: 0;
    width: 100%;
    height: 44px;
    color: #fff;
    z-index: 100;
    .back {
      position: absolute;
      top: 4px;
      left: 4px;
      .icon-back {
        padding: 5px 10px;
        font-size: 30px;
      }
    }
    .title {
      position: absolute;
      top: 0;
      left: 10%;
      z-index: 40;
      width: 80%;
      @include no-wrap();
      text-align: center;
      line-height: 40px;
      font-size: 18px;
      color: #fff;
    }
  }
  .bg-img {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 70%;
    -webkit-transform-origin: top;
    transform-origin: top;
    background-size: cover;
    .play-wrapper{
      position: absolute;
      bottom: 20px;
      z-index: 50;
      width: 100%;
      .play{
        box-sizing: border-box;
        width: 135px;
        padding: 7px 0;
        margin: 0 auto;
        text-align: center;
        border: 1px solid $color-theme-l;
        color: $color-theme-l;
        border-radius: 100px;
        font-size: 0;
        .icon-play{
          display: inline-block;
          vertical-align: middle;
          margin-right: 6px;
          font-size: $font-size-medium-x;
        }
        .text{
          display: inline-block;
          vertical-align: middle;
          font-size: $font-size-small;
        }
      }
    }
    .filter {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(7, 17, 27, 0.4);
    }
  }
  .bg-layer {
    position: relative;
    height: 100%;
    background: #f2f3f4;
  }
  .list {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    background: #f2f3f4;
    .song-list-wrapper {
      padding: 20px 30px;
      border-radius: 10px;
      .sequence-play {
        position: absolute;
        // left: 8;
        top: 0px;
        display: flex;
        align-items: center;
        width: 100%;
        height: 40px;
        padding-left: 16px;
        border-bottom: 1px solid rgb(228, 228, 228);
        .iconfont {
          font-size: 18px;
          color: $color-text;
          padding-right: 14px;
        }
        .text {
          font-size: $font-size-medium-x;
        }
      }
    }
    .loading-container{
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
    }       
  }
}
</style>

