<template>
  <div id="app">
    <main-tab-bar class="main-tab-bar"/>
    <keep-alive exclude="Detail">
      <router-view/>
    </keep-alive>

  </div>
</template>
<script>
import MainTabBar from "components/content/mianTabBar/MainTabBar";


export default {
  name: 'app',
  components: {MainTabBar}
}
</script>
<style>
@import "assets/css/base.css";
</style>
