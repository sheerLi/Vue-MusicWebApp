<template>
  <transition name="list-fade">
    <div class="playlist" @click="hide" v-show="showFlag">
      <div class="list-wrapper" @click.stop>
        <div class="list-header">
          <h1 class="title">
            <i class="iconfont" :class="iconMode" @click="changeMode"></i>
            <span class="text">{{modeText}}</span>
            <span class="clear" @click="showConfirm">
              <i class="iconfont icon-delete"></i>
            </span>
          </h1>
        </div>
        <scroll
          ref="listContent"
          :data="sequenceList"
          class="list-content"
          :refreshDelay="refreshDelay"
        >
          <transition-group name="list" tag="ul">
            <li
              :key="item.id"
              ref="list-item"
              class="item"
              v-for="(item,index) in sequenceList"
              @click="selectItem(item,index)"
            >
              <i class="current iconfont" :class="getCurrentIcon(item)"></i>
              <span class="text">{{item.songName}}</span>
              <span class="like" @click.stop="toggleFavorite(item)">
                <i class="iconfont" :class="getFavoriteIcon(item)"></i>
              </span>
              <span @click.stop="deleteOne(item)" class="delete">
                <i class="iconfont icon-red-delete"></i>
              </span>
            </li>
          </transition-group>
        </scroll>
        <div class="list-operate">
          <div @click="addSong" class="add">
            <i class="icon-add"></i>
            <span class="text">添加歌曲到队列</span>
          </div>
        </div>
        <div @click="hide" class="list-close">
          <span>关闭</span>
        </div>
      </div>
      <confirm ref="confirm" @confirm="confirmClear" text="是否清空播放列表" confirmBtnText="清空"></confirm>
      <add-song ref="addSong"></add-song>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
import { mapActions } from "vuex";
import { playMode } from "common/js/config";
import Scroll from "base/scroll/scroll";
import Confirm from "base/confirm/confirm";
import AddSong from "components/add-song/add-song";
import { playerMixin } from "common/js/mixin";

export default {
  mixins: [playerMixin],
  data() {
    return {
      showFlag: false,
      refreshDelay: 120
    };
  },
  computed: {
    modeText() {
      return this.mode === playMode.sequence
        ? "顺序播放"
        : this.mode === playMode.random
        ? "随机播放"
        : "单曲循环";
    }
  },
  methods: {
    getFavoriteIcon(song) {
      if (this.isFavorite(song)) {
        return "icon-like";
      }
      return "icon-dislike";
    },
    toggleFavorite(song) {
      if (this.isFavorite(song)) {
        this.deleteFavoriteList(song);
      } else {
        this.saveFavoriteList(song);
      }
    },
    isFavorite(song) {
      const index = this.favoriteList.findIndex(item => {
        return item.id === song.id;
      });
      return index > -1;
    },
    show() {
      this.showFlag = true;
      setTimeout(() => {
        this.$refs.listContent.refresh();
        this.scrollToCurrent(this.currentSong);
      }, 20);
    },
    hide() {
      this.showFlag = false;
    },
    showConfirm() {
      this.$refs.confirm.show();
    },
    confirmClear() {
      this.deleteSongList();
      this.hide();
    },
    getCurrentIcon(item) {
      if (this.currentSong.id === item.id) {
        return "icon-laba";
      }
      return "";
    },
    selectItem(item, index) {
      if (this.mode === playMode.random) {
        index = this.playlist.findIndex(song => {
          return song.id === item.id;
        });
      }
      this.setCurrentIndex(index);
      this.setPlayingState(true);
    },
    scrollToCurrent(current) {
      const index = this.sequenceList.findIndex(song => {
        return current.id === song.id;
      });
      this.$refs.listContent.scrollToElement(this.$refs.listItem, 300);
    },
    deleteOne(item) {
      this.deleteSong(item);
      if (!this.playList.length) {
        this.hide();
      }
    },
    addSong() {
      this.$refs.addSong.show();
    },
    ...mapActions(["deleteSong", "deleteSongList"])
  },
  watch: {
    currentSong(newSong, oldSong) {
      if (!this.showFlag || newSong.id === oldSong.id) {
        return;
      }
      setTimeout(() => {
        this.scrollToCurrent(newSong);
      }, 20);
    }
  },
  components: {
    Scroll,
    Confirm,
    AddSong
  }
};
</script>

<style scoped lang="scss" rel="stylesheet/scss">
@import "~common/scss/variable";
@import "~common/scss/mixin";

.playlist {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 200;
  background-color: $color-background-d;
  &.list-fade-enter-active,
  &.list-fade-leave-active {
    transition: opacity 0.3s;
    .list-wrapper {
      transition: all 0.3s;
    }
  }
  &.list-fade-enter,
  &.list-fade-leave-to {
    opacity: 0;
    .list-wrapper {
      transform: translate3d(0, 100%, 0);
    }
  }
  .list-wrapper {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: $color-dialog-background;
    .list-header {
      position: relative;
      padding: 20px 30px 10px 20px;
      .title {
        display: flex;
        align-items: center;
        .iconfont {
          margin-right: 10px;
          font-size: $font-size-large;
          color: $color-theme-d;
        }
        .text {
          flex: 1;
          font-size: $font-size-large;
          color: $color-text-g;
        }
        .clear {
          @include extend-click();
          .icon-delete {
            font-size: $font-size-large;
            color: $color-text-g;
          }
        }
      }
    }
    .list-content {
      max-height: 240px;
      overflow: hidden;
      .item {
        display: flex;
        align-items: center;
        height: 40px;
        padding: 0 30px 0 20px;
        overflow: hidden;
        &.list-enter-active,
        &.list-leave-active {
          transition: all 0.1s;
        }
        &.list-enter,
        &.list-leave-to {
          height: 0;
        }
        .current {
          flex: 0 0 20px;
          width: 20px;
          font-size: $font-size-small;
          color: $color-theme-d;
        }
        .text {
          flex: 1;
          @include no-wrap();
          font-size: $font-size-medium;
          color: $color-text-g;
        }
        .like {
          @include extend-click();
          margin-right: 15px;
          font-size: $font-size-small;
          color: $color-text-g;
          .icon-favorite {
            color: $color-sub-theme;
          }
        }
        .delete {
          @include extend-click();
          font-size: $font-size-small;
          color: $color-text-g;
        }
      }
    }
    .list-operate {
      width: 140px;
      margin: 20px auto 30px auto;
      .add {
        display: flex;
        align-items: center;
        padding: 8px 16px;
        border: 1px solid $color-text-l;
        border-radius: 100px;
        color: $color-text-g;
        .icon-add {
          margin-right: 5px;
          font-size: $font-size-small-s;
        }
        .text {
          font-size: $font-size-small;
        }
      }
    }
    .list-close {
      text-align: center;
      line-height: 50px;
      background: $color-dialog-background;
      font-size: $font-size-medium-x;
      color: $color-text-g;
    }
  }
}
</style>