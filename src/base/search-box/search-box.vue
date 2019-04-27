<template>
  <div class="search-box">
    <input :placeholder="placeholder" v-model="query" type="text" ref="query" class="box">
    <i @click="clear" v-show="query" class="iconfont icon-dismiss"></i>
  </div>
</template>

<script>

import {debonce} from 'common/js/util'
export default {
  props: {
    placeholder: {
      type: String,
      default: '搜索歌曲，歌手'
    }
  },
  data() {
    return {
      query: ''
    }
  },
  created() {
    this.$watch('query', debonce((newQuery) => {
      this.$emit('query', newQuery)
    }, 200))
  },
  methods: {
    clear() {
      this.query = ''
    },
    setQuery(hotkey) {
      this.query = hotkey
    },
    blur() {
      this.$refs.query.blur()
    }
  }
  
}
</script>

<style lang="scss" scoped>
@import "~common/scss/variable";

.search-box {
  // position: relative;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  height: 25px;
  border-bottom: 1px solid rgb(235, 235, 235);
  .box {
    flex: 1;
    line-height: 25px;
    background: $color-theme;
    color: #fff;
    font-size: $font-size-medium;
    border: none;
    outline: medium;
    &::placeholder {
      color: rgba(255, 255, 255, 0.6);
    }
  }
  .icon-delete {
    position: absolute;
    right: 12px;
    font-size: 24px;
    color: rgba(255, 255, 255, 0.8);
    border: none;
  }
}
    
</style>

