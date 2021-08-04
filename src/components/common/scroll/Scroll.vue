<template>
  <!-- ref/childern 绑定给子组件 -->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>

import Bscroll from "better-scroll";

export default {
  name: "Scroll", data() {
    return {
      scroll: null
    }
  }, props: {
    probeType: {
      type: Number,
      default: 0
    }, pullUpLoad: {
      type: Boolean,
      default: false
    },
  }, mounted() {
    //1、创建BScroll对象
    this.scroll = new Bscroll(this.$refs.wrapper, {
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    });

    //  2、监听滚动区域
    this.scroll.on('scroll', position => {
      //  返回当前坐标
      this.$emit('scroll', position)
    })

    // 3、监听scroll滚动到底部
    this.scroll.on('pullingUp', () => {
      this.$emit('loadMore')
    })
    // this.scroll.refresh();
  }, methods: {
    scrollTo(x, y, time = 500) {
      this.scroll && this.scroll.scrollTo(x, y, time)
    }, finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
    }, refresh() {
      this.scroll && this.scroll.refresh()
    }
  }
}
</script>

<style scoped>
.wrapper {

}
</style>
