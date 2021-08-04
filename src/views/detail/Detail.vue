<template>
  <div id="detail">
    <detail-nav-bar></detail-nav-bar>
    <detail-swiper :topImages="topImages"/>
  </div>
</template>

<script>
import {getDetail} from "network/detail";

import DetailNavBar from "./childCompos/DetailNavBar/DetailNavBar";
import DetailSwiper from "./childCompos/DetailNavBar/DetailSwiper";


export default {
  name: "Detail", data() {
    return {
      iid: null,
      topImages: []
    }
  },
  created() {
    //1.保存传入的iid
    this.iid = this.$route.params.iid;
    //  2.根据iid请求详情页数据
    getDetail(this.iid).then(res => {
      console.log(res);
      //  1、获取顶部轮播数据
      this.topImages = res.result.itemInfo.topImages
    })
  }, components: {
    DetailNavBar, DetailSwiper
  }
}
</script>

<style scoped>

</style>
