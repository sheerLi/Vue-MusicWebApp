<template>
  <div class="search">
    <div class="search-box-wrapper">
      <i class="iconfont icon-back" @click="back"></i>
      <search-box @query="onQueryChange" ref="searchBox"></search-box>
    </div> 
    <div class="shortcut-wrapper" ref="shortcutWrapper" v-show="!query">
      <Scroll class="shortcut" ref="shortcut" :data="shortCut">
        <div>
          <div class="hot-key">
            <h1 class="title">热门搜索</h1>
            <ul>
              <li @click="selectHotKey(item.k)" class="item" v-for="(item, index) in hotKey" :key="index">{{ item.k }}</li>
            </ul>
          </div>
          <div class="search-history" v-show="searchHistory.length">
            <h1 class="title">
              <span>搜索历史</span>
              <span class="clear" @click="showConfirm"><i class="iconfont icon-delete"></i></span>
            </h1>
            <search-list @select="selectHotKey" @delete="deleteSearchHistory" :searches="searchHistory"></search-list>
          </div>
        </div>
      </Scroll>
    </div>

    <div class="search-result" ref="searchResult" v-show="query">
      <suggest ref="suggest" @select="saveSearch" @listScroll="blurInput" :query="query"></suggest> 
    </div>
    <confirm @confirm="clearSearchHistory" ref="confirm" text="是否清空所有搜索历史" confirmBtnText="清空"></confirm>
    <router-view></router-view>
  </div>
  
</template>

<script>
import SearchBox from "base/search-box/search-box";
import {getHotkey} from 'api/search'
import {ERR_OK} from 'api/config'
import Suggest from 'components/suggest/suggest'
import SearchList from 'base/search-list/search-list'
import Confirm from 'base/confirm/confirm'
import Scroll from 'base/scroll/scroll'
import {mapActions, mapGetters} from 'vuex'
import {playlistMixin} from 'common/js/mixin'
export default {
  mixins: [playlistMixin],
  created() {
    this._getHotKey()
  },
  data() {
    return {
      hotKey: [],
      query: ''
    }
  },
  watch: {
    query(newQuery) {
      if(!newQuery) {
        setTimeout(() => {
          this.$refs.shortcut.refresh()
        }, 20)
      }
    }
  },
  computed: {
    shortCut() {
      return this.hotKey.concat(this.searchHistory)
    },
    ...mapGetters([
      'searchHistory'
    ])
  },
  methods: {
    back() {
      this.$router.back()
    },
    handlePlaylist(playlist) {
      const bottom = playlist.length > 0 ? '60px' : ''
      this.$refs.shortcutWrapper.style.bottom = bottom
      this.$refs.shortcut.refresh()

      this.$refs.searchResult.style.bottom = bottom
      this.$refs.suggest.refresh()
    },
    _getHotKey() {
      getHotkey().then((res) => {
        if(res.code === ERR_OK){
          this.hotKey = res.data.hotkey.slice(0, 10) 
        }
      })
    },
    showConfirm() {
      this.$refs.confirm.show()
    },
    selectHotKey(hotKey) {
      this.$refs.searchBox.setQuery(hotKey)
    },
    onQueryChange(query) {
      this.query = query
    },
    blurInput() {
      this.$refs.searchBox.blur()
    },
    saveSearch() {
      this.saveSearchHistory(this.query)
    },
    ...mapActions([
      'saveSearchHistory',
      'deleteSearchHistory',
      'clearSearchHistory'
    ])
  },
  components: {
    SearchBox,
    Suggest,
    SearchList,
    Confirm,
    Scroll
  }
};
</script>

<style lang="scss" scoped>
@import "~common/scss/variable";
@import "~common/scss/mixin";

.search-enter-active, .search-leave-active {
  transition: all 0.3s;
}
.search-enter, .search-leave-to {
  transform: translate3d(50%, 0, 0);
  opacity: 0;
}
.search {
  position: fixed;
  z-index: 100;
  width: 100%;
  top: 0;
  bottom: 0;
  background: $color-background;
  .search-box-wrapper {
    padding: 10px 40px 10px 43px;
    // margin-bottom: 15px;
    background: $color-theme;
    .icon-back {
      position: absolute;
      left: 5px;
      top: 3px;
      padding: 3px 10px;
      font-size: 30px;
      color: #fff;
    }
  } 
  .shortcut-wrapper {
    position: fixed;
    top: 60px;
    bottom: 0;
    width: 90%;
    margin: 0 auto;
    .shortcut {
      height: 100%;
      overflow: hidden;
      .hot-key {
        margin: 20px;
        .title {
          margin-bottom: 20px;
          font-size: $font-size-medium;
          color: $color-text;
        }
        .item {
          display: inline-block;
          padding: 5px 8px;
          margin: 0 15px 10px 0;
          border-radius: 6px;
          color: #222;
          border: .8px solid #c7c7c7;
          font-size: $font-size-medium;
          color: $color-text;
        }
      }
      .search-history{
        position: relative;
        margin: 0 20px;
        .title{
          display: flex;
          align-items: center;
          height: 40px;
          font-size: $font-size-medium;
          color: $color-text-g;
          .text{
            flex: 1;
          }         
          .clear{
            @include extend-click();
            .icon-clear{
              font-size: $font-size-medium;
              color: $color-text-g;
            }
          }             
        }         
      }         
    }
  }
  .search-result {
    position: fixed;
    width: 100%;
    top: 50px;
    bottom: 0;
  }
}
</style>
