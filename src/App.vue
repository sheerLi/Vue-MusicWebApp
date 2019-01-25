<template>
  <div id="app">
    <Header></Header>
    <Tab></Tab>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from 'components/header/header'
import Tab from 'components/tab/tab'
export default {
  data(){
    return {}
  },
  components: {
    Header,
    Tab
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
