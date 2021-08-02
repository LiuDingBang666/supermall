<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <scroll @pullingUp="loadMore" @scroll="contentScroll" :pull-up-load="true" :probe-type="3" ref="scroll"
            class="content">
      <home-swiper :banners="banners"/>
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control class="tab-control" :titles=" ['流行', '新款', '精选']" @tabClick="tabClick"/>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
/*公共组件*/
import NavBar from "@/components/common/navbar/NavBar";
import HomeSwiper from "./childComps/HomeSwiper";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";

/*单独组件*/
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";
import {
  getHomeMultidata, getHomeGoods
} from "network/home";


/*BSscroll*/

export default {
  name: "Home",
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },
  components: {
    NavBar,
    HomeSwiper,
    RecommendView, FeatureView, TabControl, GoodsList, Scroll, BackTop
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
      isShowBackTop: false,
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []}
      },
      currentType: 'pop',
      types: ['pop', 'new', 'sell']
    }
  }, methods: {
    /*事件监听相关方法*/
    tabClick(index) {
      // console.log(index);
      this.currentType = this.types[index]
    },
    /*网络请求相关方法*/
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
    },
    backClick() {
      /*跳转到顶部*/
      console.log('跳转到顶部');
      this.$refs.scroll.scrollTo(0, 0, null)
    },
    contentScroll(position) {
      // console.log(position);
      this.isShowBackTop = -position.y > 1000;
    }, loadMore() {
      console.log('上拉加载更多');
      this.getHomeGoods(this.currentType)
      this.$refs.scroll.finishPullUp();
      /*重新计算可滚动区域*/
      this.$refs.scroll.scroll.refresh();
    }

  }
}
</script>

<style scoped>
#home {
  /* padding-top: 44px;*/
  height: 100vh;
  position: relative;
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

.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0px;
  right: 0px;
}

/*.content {
  height: calc(100% - 93px);
  overflow: hidden;
  margin-top: 44px;
}*/
</style>
