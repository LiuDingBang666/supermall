import {debounce} from "./utils";

export const itemListerenMixin = {
  data() {
    return {
      itemImgListener: null
    }
  }, mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 500)
    this.itemImgListener = () => {
      refresh();
    };
    this.$bus.$on('itemImageLoad', this.itemImgListener)
  }
}
