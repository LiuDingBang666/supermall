<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <home-swiper :banners="banners"/>
    <recommend-view :recommends="recommends"/>
    <feature-view/>
    <tab-control class="tab-control" :titles="['流行','新款','精选']"/>
    <goods-list  :goods="goods['pop'].list"></goods-list>
  </div>
</template>

<script>
/*公共组件*/
import NavBar from "@/components/common/navbar/NavBar";
import HomeSwiper from "./childComps/HomeSwiper";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";

/*单独组件*/
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";
import {
  getHomeMultidata, getHomeGoods
} from "network/home";


export default {
  name: "Home",

  components: {
    NavBar,
    HomeSwiper,
    RecommendView, FeatureView, TabControl, GoodsList
  }, created() {
    //  组件创建完发送网络请求
    //1、请求多个数据
    this.getHomeMultidata()
    //  2、请求商品数据
    this.getHomeGoods('pop')

    this.getHomeGoods('new')

    this.getHomeGoods('sell')
  }, data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []}
      }
    }
  }, methods: {
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        // console.log(res.data.recommend.list);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    },
    getHomeGoods(type) {
      /*页数加一*/
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        // console.log(res.data.list);
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1;
      })
    }
  }
}
</script>

<style scoped>
#home {
  padding-top: 44px;
}

.home-nav {
  background-color: var(--color-tint);
  color: white;
  position: fixed;
  left: 0px;
  right: 0px;
  top: 0px;
  z-index: 10;
}

.tab-control {
  position: sticky;
  top: 44px;
  z-index: 9;
}


</style>
