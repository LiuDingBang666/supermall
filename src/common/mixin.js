import {debounce} from "./utils";
import BackTop from "components/content/backTop/BackTop";

export const itemListerenMixin = {
  data() {
    return {
      itemImgListener: null
    }
  }, mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 100)
    this.itemImgListener = () => {
      refresh();
    };
    this.$bus.$on('itemImageLoad', this.itemImgListener)
  }
}


export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false
    }
  }, methods: {
    backClick() {
      /*跳转到顶部*/
      console.log('跳转到顶部');
      this.$refs.scroll.scrollTo(0, 0, null)
    },

  }

}
