<template>
  <div class="search-list" v-show="searches.length">
    <transition-group name="list" tag="ul">
      <li :key="item" class="search-item" @click="selectItem(item)" v-for="item in searches">
        <span class="text">{{item}}</span>
        <span class="icon" @click.stop="deleteOne(item)">
          <i class="iconfont icon-red-delete"></i>
        </span>
      </li>
    </transition-group>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      searches: {
        type: Array,
        default: []
      }
    },
    methods: {
      selectItem(item) {
        this.$emit('select', item)
      },
      deleteOne(item) {
        this.$emit('delete', item)
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "~common/scss/variable";
  @import "~common/scss/mixin";

  .search-list{
    .search-item{
      display: flex;
      align-items: center;
      height: 40px;
      overflow: hidden;
      &.list-enter-active, &.list-leave-active{
        transition: all 0.1s;
      }
      &.list-enter, &.list-leave-to{
        height: 0
      }
      .text{
        flex: 1;
        color: $color-text-g;
        font-size: $font-size-medium;
      }
      .icon{
        @include extend-click();
        .icon-red-delete{
          font-size: $font-size-large;
          color: $color-text-g;
        }
      }
    }     
  }
    
</style>