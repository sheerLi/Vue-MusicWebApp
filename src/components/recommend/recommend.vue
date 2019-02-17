<template>
  <div class="recommend">
    <Scroll ref="scroll" class="recommend-content" :data="discList">
      <div>
        <div class="decorate"></div>
        <div class="slider-wrapper" ref="sliderWrapper" v-if="recommends.length">
          <Slider>
            <div v-for="item in recommends" :key="item.id">
              <img @load="imgLoad" :src="item.picUrl" alt="">
            </div>
          </Slider>  
        </div>
        <div class="recommend-list">
          <h3 class="title">热门歌单</h3>
          <ul>
            <li v-for="item in discList" :key="item.dissid" class="item"> 
              <img v-lazy="item.imgurl" alt="" class="icon">
              <p class="desc">{{ item.dissname }}</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="loading-container" v-show="!discList.length">
        <Loading></Loading>
      </div>
    </Scroll>
  </div>
</template>
<script>
import {getRecommend, getDiscList} from 'api/recommend.js'
import {ERR_OK} from 'api/config.js'
import Scroll from 'base/scroll/scroll'
import Slider from 'base/slider/slider'
import Loading from 'base/loading/loading'
import BScroll from 'better-scroll'
export default {
  data(){
    return {
      recommends:[],
      discList: []
    }
  },
  created(){
    this._getRecommend();
    this._getDiscList();
  },
  methods: {
    // 获取轮播图数据
    _getRecommend(){
      getRecommend().then((res) => {
        if(res.code === ERR_OK){
          // console.log(res.data.slider);
          this.recommends = res.data.slider;
        } else{
          console.log('获取失败');
        }
      })
    },
    _getDiscList() {
      getDiscList().then((res) => {
        if(res.code === ERR_OK){
          this.discList = res.data.list
        }
      })
    },
    imgLoad() {
      if(!this.checkLoaded){
        this.$refs.scroll.refresh();
        this.checkLoaded = true;
      } 
    }
  },
  components: {
    Slider,
    Scroll,
    Loading
  }
}
</script>

<style lang="scss" scoped>
  @import "common/scss/variable.scss";
  @import "~common/scss/mixin";
  .recommend{
    position: fixed;
    top: 88px;
    bottom: 0;
    z-index: 100;
    width: 100%;
    .recommend-content{
      height: 100%;
      overflow: hidden;
      position: relative;
      .loading-container{
        position: absolute;
        width: 100%;
        top: 50%;
        transform: translateY(-50%)
      }
      .decorate{
        position: absolute;
        top: 0vh;
        z-index: -10;
        background: $color-theme;
        width: 100%;
        height: 20vh;
        vertical-align: inherit;     
      }
      .slider-wrapper{
        width: 96%;
        margin: 0 auto;
        border-radius: 5px;
        box-shadow: 0 1px 1px #3c3c3c;
        overflow: hidden;
      }
      .recommend-list{
        box-sizing: border-box;
        width: 100%;
        .title{
          line-height: 65px;
          padding-left: 1.5%;
          font-size: $font-size-medium;
          text-align: left;
          color: $color-text;
          font-weight: 700;
        }
        .item{
          display: inline-block;
          box-sizing: border-box;
          width: 33%;
          padding: 0 1%;
          .icon{
            width: 100%;
            height: 100%;
            border-radius: 3px;
          }
          .desc{
            float: left;
            height: 40px;
            line-height: 16px;
            text-align: left;
            font-size: $font-size-small-x;
            margin-top: 5px;
          }
        }
      }
    }
  }
</style>
