<template>
  <transition>
    <div class="singer-detail">
    
    </div>
  </transition>
  
</template>

<script>
export default {
  
}
</script>

<style lang="scss" scoped>
  @import "~common/scss/variable.scss";
  .singer-detail{
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: $color-background;
  }

  .v-leave-active, .v-enter-active{
    transition: all 0.3s
  }

  .v-enter, .v-leave-to{
    transform: translate3d(100%, 0, 0)
  }
  
</style>

