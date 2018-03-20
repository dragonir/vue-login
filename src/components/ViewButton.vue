<template>
  <div class="w">
    <router-link to="/repository">
      <button class="view-rep-btn">view your repositories</button>
    </router-link>
  </div>
</template>

<script>
export default {
  created() {
    this.$store.commit('title', 'index');
  }
}
</script>

<style scoped lang="stylus">
  .w
    height: 100px
    display: flex
    justify-content: center
    align-items: center
    .view-rep-btn
      padding: 0 10px
      border: 0
      background-color: #3f51b5
      line-height: 40px
      color: #fff
</style>