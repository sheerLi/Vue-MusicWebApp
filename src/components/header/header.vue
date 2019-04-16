<template>
  <div class="header">
    <h1 class="text">VUE-MUSIC</h1>
    <router-link class="mine" tag="div" to>
      <i class="iconfont icon-user"></i>
    </router-link>
    <router-link class="search" tag="div" to>
      <i class="iconfont icon-search"></i>
    </router-link>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "common/scss/variable.scss";
.header {
  position: relative;
  width: 100%;
  height: 44px;
  background-color: $color-theme;
  .text {
    line-height: 44px;
    font-weight: bold;
    color: $color-text-l;
    letter-spacing: 3px;
    font-size: $font-size-large;
    text-align: center;
  }
  .mine {
    position: absolute;
    top: 0;
    left: 0;
    .iconfont {
      display: block;
      padding: 11px;
      font-size: 22px;
      color: $color-theme-l;
    }
  }
  .search {
    position: absolute;
    top: 0;
    right: 2px;
    .iconfont {
      display: block;
      padding: 12px;
      font-size: 18px;
      color: $color-theme-l;
    }
  }
}
</style>
