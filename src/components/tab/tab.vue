<template>
  <div class="tab">
    <router-link class="tab-item" tag="div" to="/recommend">
      <span>推荐</span>
    </router-link>
    <router-link class="tab-item" tag="div" to="/singer">
      <span>歌手</span>
    </router-link>
    <router-link class="tab-item" tag="div" to="/rank">
      <span>排行</span>
    </router-link>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="scss" scoped>
  @import 'common/scss/variable.scss';
  .tab {
    width: 100%;
    height: 44px;
    line-height: 44px;
    display: flex;
    background-color: $color-theme;
    .tab-item {
      flex: 1;  
      text-align: center;
      font-size: $font-size-medium;
      color: $color-text-lm;
      span{
        padding-bottom: 3px;
      }
      &.router-link-active{
        span{
          font-weight: bold;
          color: $color-text-l;
          border-bottom: 2px solid $color-text-l;
        }
      }
    }
  }
</style>
