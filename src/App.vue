<template>
  <div id="app">
    <Header></Header>
    <Tab></Tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <player></player>
  </div>
</template>

<script>
import Header from 'components/header/header'
import Tab from 'components/tab/tab'
import Player from 'components/player/player'
export default {
  data(){
    return {}
  },
  components: {
    Header,
    Tab,
    Player
  }
}
</script>

<style lang="scss" scoped>
  @import 'common/scss/index.scss';
  #app{
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    overflow: hidden;
  }
</style>
