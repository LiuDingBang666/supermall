<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <home-swiper :banners="banners"/>
    <recommend-view :recommends="recommends"/>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import HomeSwiper from "./childComps/HomeSwiper";
import {getHomeMultidata} from "network/home";
import RecommendView from "./childComps/RecommendView";

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView
  }, created() {
    //  组件创建完发送网络请求
    //1、请求多个数据
    getHomeMultidata().then(res => {
       // console.log(res.data.recommend.list);
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list;
    })
  }, data() {
    return {
      banners: [],
      recommends: []
    }
  }
}
</script>

<style scoped>
.home-nav {
  background-color: var(--color-tint);
  color: white;
}
</style>
