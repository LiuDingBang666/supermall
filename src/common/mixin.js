import {debounce} from "./utils";

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
