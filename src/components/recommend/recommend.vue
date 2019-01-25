<template>
  <div class="recommend">
    <div class="recommend-content">
      <div class="decorate"></div>
      <div class="slider-wrapper" ref="sliderWrapper" v-if="recommends.length">
        <Slider>
          <div v-for="item in recommends" :key="item.id">
            <img :src="item.picUrl" alt="">
          </div>
        </Slider>  
      </div>
      <div class="recommend-list">
        <h3>热门歌单</h3>
      </div>
    </div>
  </div>
</template>
<script>
import {getRecommend} from 'api/recommend.js'
import {ERR_OK} from 'api/config.js'
import Slider from 'base/slider/slider'
import BScroll from 'better-scroll'
export default {
  data(){
    return {
      recommends:[]
    }
  },
  created(){
    this._getRecommend();
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
    }
   
  },
  components: {
    Slider
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
    }
  }
</style>
