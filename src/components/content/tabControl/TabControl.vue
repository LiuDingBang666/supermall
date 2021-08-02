<template>
  <div class="tab-control">
    <div v-for="(item,index) in titles" :class="{active:index==currentIndex}" class="tab-control-item"
         @click="itemClick(index)">
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl", data() {
    return {
      currentIndex: 0
    }
  }, methods: {
    itemClick(index) {
      this.currentIndex = index
      /*将当前索引传给Home组件，切换分类数据*/
      this.$emit('tabClick',index)
    }
  },
  props: {
    titles: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
.tab-control {
  display: flex;
  font-size: 14px;
  text-align: center;
  height: 40px;
  line-height: 40px;
  background-color: #fff;
}

.tab-control-item {
  flex: 1;
}

.tab-control-item span {
  padding: 5px;
}

.active {
  color: var(--color-high-text);

}

.active span {
  border-bottom: 3px solid var(--color-tint);
}
</style>
