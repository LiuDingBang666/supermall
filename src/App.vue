<template>
  <div id="app">
    <main-tab-bar class="main-tab-bar"/>
    <router-view/>
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
