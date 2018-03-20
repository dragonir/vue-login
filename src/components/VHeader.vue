<template>
  <header>
    <div class="w header-inner">
      <div class="icon-wrapper">
        <i class="fa fa-github"></i>
        {{title}}
      </div>
      <a href="javascript:void(0);" class="logout" v-show="token" @click="logout">logout</a>
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex';
export default {
  data() {
    return {
      
    };
  },
  computed: {
    ...mapState({
      title: state => state.title,
      token: state => state.token
    })
  },
  methods: {
    logout() {
      this.$store.commit('logout');
      this.$router.push({ path: '/' });
    }
  }
}
</script>

<style scoped lang="stylus">
  header
    width: 100%
    height: 60px
    background-color #24292e
    .header-inner
      height: 100%
      display: flex
      justify-content: space-between
      align-items: center
      color: #fff
      .icon-wrapper
        height: 100%
        display: flex
        justify-content: space-around
        align-items: center
      .fa-github
        margin-right: 10px
        vertical-align: middle
        font-size: 40px
      .logout
        color: #f00
</style>