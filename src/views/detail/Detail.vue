<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"/>
    <scroll @scroll="contentScroll" :probe-type="3" class="content" ref="scroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shopInfo"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad()"/>
      <detail-param-info :param-info="paramInfo"/>
      <detail-comment-info :comment-info="commentInfo"/>
      <detail-recommend :recommends="recommends"/>
      <goods-list :goods="recommends"/>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
import {getDetail, getRecommend} from "network/detail";
import {Goods, Shop, GoodsParam} from "../../network/detail";


import Scroll from "components/common/scroll/Scroll";
import DetailNavBar from "./childCompos/DetailNavBar";
import DetailSwiper from "./childCompos/DetailSwiper";
import DetailBaseInfo from "./childCompos/DetailBaseInfo";
import DetailShopInfo from "../home/childComps/DetailShopInfo";
import DetailGoodsInfo from "./childCompos/DetailGoodsInfo";
import DetailParamInfo from "./childCompos/DetailParamInfo";
import DetailCommentInfo from "./childCompos/DetailCommentInfo";
import DetailRecommend from "./childCompos/DetailRecommend";
import GoodsList from "../../components/content/goods/GoodsList";
import BackTop from "../../components/content/backTop/BackTop";

import {debounce} from "../../common/utils";


export default {
  name: "Detail", data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shopInfo: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      isShowBackTop: false,
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

    })
    //  3.请求推荐数据
    getRecommend().then(res => {
      this.recommends = res.data.list;
    })
  }, components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo, DetailRecommend, GoodsList, BackTop
  }, methods: {
    imageLoad() {
      this.$refs.scroll.refresh();
    }, backClick() {
      /*跳转到顶部*/
      console.log('跳转到顶部');
      this.$refs.scroll.scrollTo(0, 0, null)
    }, contentScroll(position) {
      //1、判断BackTop是否显示 内容滚动
      this.isShowBackTop = -position.y > 1000;
    }
  }, mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 100)
    this.$bus.$on('detailImageLoad', () => {
      refresh();
    })
  }
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
  height: calc(100% - 44px);
}

.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #ffffff;
}
</style>
