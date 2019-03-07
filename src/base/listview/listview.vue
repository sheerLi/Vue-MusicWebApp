<template>
  <Scroll class="listview" :data="data">
    <ul>
      <li class="list-group" v-for="(item, index) in data" :key="index">
        <h2 class="list-group-title">{{ item.title }}</h2>
        <ul>
          <li v-for="(item, index) in item.items" :key="index" class="list-group-item">
            <img :src="item.avatar" alt="" class="item-avatar">
            <span class="item-name">{{ item.name }}</span>
          </li>
        </ul>
      </li>
    </ul>
  </Scroll>
</template>

<script>
import Scroll from 'base/scroll/scroll'
export default {
  props: {
    data: {
      type: Array,
      default: []
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
        color: #fff;
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
  }
</style>


