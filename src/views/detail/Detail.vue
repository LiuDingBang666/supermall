<template>
  <div id="detail">
    <detail-nav-bar ref="nav" class="detail-nav" @titleClick="titleClick"/>
    <scroll @scroll="contentScroll" :probe-type="3" class="content" ref="scroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shopInfo"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad()"/>
      <detail-param-info ref="param" :param-info="paramInfo"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <goods-list ref="recommend" :goods="recommends"/>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
    <detail-bottom-bar/>
  </div>
</template>

<script>
import {getDetail, getRecommend} from "network/detail";
import {Goods, Shop, GoodsParam} from "../../network/detail";


import Scroll from "components/common/scroll/Scroll";
import DetailNavBar from "./childCompos/DetailNavBar";
import DetailSwiper from "./childCompos/DetailSwiper";
import DetailBaseInfo from "./childCompos/DetailBaseInfo";
import DetailShopInfo from "./childCompos/DetailShopInfo";
import DetailGoodsInfo from "./childCompos/DetailGoodsInfo";
import DetailParamInfo from "./childCompos/DetailParamInfo";
import DetailCommentInfo from "./childCompos/DetailCommentInfo";
import GoodsList from "components/content/goods/GoodsList";


import {debounce} from "../../common/utils";
import DetailBottomBar from "./childCompos/DetailBottomBar";
import {backTopMixin} from "common/mixin";

export default {
  name: "Detail",
  mixins: [backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shopInfo: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopy: null,
      currentIndex: 0
    }
  }, /*mixins: [itemListerenMixin],*/
  created() {
    //1.保存传入的iid
    this.iid = this.$route.params.iid;
    //  2.根据iid请求详情页数据
    getDetail(this.iid).then(res => {
      // console.log(res.result);
      const data = res.result;
      //  1、获取顶部轮播数据
      this.topImages = data.itemInfo.topImages
      //  2、获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);
      //  3、获取商家信息
      this.shopInfo = new Shop(data.shopInfo);
      //  4、获取商品详情信息
      this.detailInfo = data.detailInfo;
      //  5、获取商品参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
      //  6、取出评论信息
      if (data.rate.cRate !== 0) this.commentInfo = data.rate.list[0];

      /*   /!*元素渲染后的回调参数*!/
         this.$nextTick(() => {
           //根据最新的数据，对应的Dom已经被渲染出来了，但是图片依然没有加载完
           //获取分类中每个标题的位置y值

           this.themeTopYs.push(0)
           this.themeTopYs.push(this.$refs.param.$el.offsetTop)
           this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
           this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
           console.log(this.themeTopYs);
         })*/
    })
    //  3.请求推荐数据
    getRecommend().then(res => {
      this.recommends = res.data.list;
    })

    //  4.给getThemeTopy赋值
    this.getThemeTopy = debounce(() => {
      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.param.$el.offsetTop)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
    }, 500);
  },
  updated() {

  },
  mounted() {
    //1、随着图片加载更新滚动宽度
    const refresh = debounce(this.$refs.scroll.refresh, 100)
    this.$bus.$on('detailImageLoad', () => {
      refresh();
    })

  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo, GoodsList, DetailBottomBar
  },
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh();
      this.getThemeTopy()
      console.log(this.themeTopYs);
    }
    ,
    contentScroll(position) {
      //1、判断BackTop是否显示 内容滚动
      this.isShowBackTop = -position.y > 1000;


      //2、判断当前滚动位置，并更新当前滚动的标题
      const positionY = -position.y;
      let length = this.themeTopYs.length
      for (let i = 0; i < length; i++) {
        if (this.currentIndex !== i &&
          (i < length - 1 && positionY >= this.themeTopYs[i]
            && positionY < this.themeTopYs[i + 1]) || ((i === length - 1)
            && positionY >= this.themeTopYs[i]
          )) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = i;
        }
      }
    },
    titleClick(index) {
      //1、根据当前index，滚动到指定板块的y值
      //2、监听滚动，根据当前位置设置
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 500)
    }
  },

}
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}

.content {
  height: calc(100% - 44px - 49px);
}

.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #ffffff;
}
</style>
