<template>
  <div v-show="recommends!=null">
    <h5 class="title">热门推荐</h5>
  </div>
</template>

<script>



export default {
  name: "DetailRecommend",
  props: {
    recommends: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>

</style>
