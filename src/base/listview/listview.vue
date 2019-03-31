<template>
  <Scroll class="listview" :data="data" ref="listview">
    <ul>
      <li class="list-group" v-for="(item, index) in data" :key="index" ref="listGroup">
        <h2 class="list-group-title">{{ item.title }}</h2>
        <ul>
          <li @click="selectItem(item)" v-for="(item, index) in item.items" :key="index" class="list-group-item">
            <img v-lazy="item.avatar" alt="" class="item-avatar">
            <span class="item-name">{{ item.name }}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="list-letter" 
         @touchstart="onListLetterTouchStart"
         @touchmove.stop.prevent="onListLetterTouchMove"
    >
      <ul>
        <li class="letter-item" 
            v-for="(item, index) in getLetterList" 
            :key="index"
            :data-index="index"         
        >
          {{ item }}
        </li>
      </ul>
    </div>
  </Scroll>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import {getData} from 'common/js/dom'
const ANCHOR_HEIGHT = 18

export default {
  created(){
    this.touch = {}
  },
  props: {
    data: {
      type: Array,
      default: []
    }
  },
  computed: {
    getLetterList() {
      return this.data.map((group) => {
        return group.title.substr(0, 1);
      })
    }
  },
  methods: {
    selectItem(item){
      this.$emit('select', item)
    },
    onListLetterTouchStart(e){
      let anchorIndex = getData(e.target, 'index')
      this.touch.y1 = e.touches[0].pageY
      this.touch.anchorIndex = anchorIndex
      this._scrollTo(anchorIndex)
    },
    onListLetterTouchMove(e){
      this.touch.y2 = e.touches[0].pageY
      let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0
      let anchorIndex = parseInt(this.touch.anchorIndex) + delta
      this._scrollTo(anchorIndex)
    },
    _scrollTo(index){
      this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)
    }
  },
  components: {
    Scroll
  }
}
</script>

<style lang="scss" scoped>
  @import "common/scss/variable.scss";
  .listview{
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: $color-background;
    .list-group{
      // width: 100%;
      .list-group-title{
        height: 30px;
        line-height: 30px;
        padding-left: 12px;
        margin-bottom: 10px;
        font-size: $font-size-small-x;
        color: #333;
        background-color: rgba(0, 0, 0, .1);
      }
      .list-group-item{
        display: flex;
        align-items: center;
        padding: 5px 0;
        margin: 0 5px;
        border-bottom: 1px solid rgb(228, 228, 228);
        &:last-child{
          border: none;
          margin-bottom: 10px;
        }
        .item-avatar{
          width: 50px;
          height: 50px;
          border-radius: 3px;
        }
        .item-name{
          margin-left: 20px;
          color: $color-text;
          font-size: $font-size-medium;
        }
      }     
    }
    .list-letter{
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 20px;
      background-color: $color-background-d;
      text-align: center;
      border-radius: 10px;
      padding: 20px 0;
      .letter-item{
        padding: 3px;
        line-height: 1;
        color: $color-text;
        font-size: $font-size-small;
      }
    }
  }
</style>


