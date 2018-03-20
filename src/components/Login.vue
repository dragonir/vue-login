<template>
  <div class="w">
    <div class="login">
      <form class="login-form" @submit.stop.prevent="login">
        <input type="password"
          placeholder="Github Personal Token(Press Enter)"
          v-model.trim="inputToken">
      </form>
      <a class="generate-link" href="https://github.com/settings/tokens/new" target="_blank">generate your token</a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputToken: ''
    };
  },
  created() {
    this.$store.commit('title', 'login');
  },
  methods: {
    login() {
      if (!this.inputToken) {
        alert('请输入token');
      } else {
        this.$store.commit('login', this.inputToken);
        let path = decodeURIComponent(this.$route.query.redirect || '/');
        this.$router.push({ path });
      }
    }
  }
}
</script>

<style scoped lang="stylus">
 .login
    width: 400px
    margin: 40px auto
    text-align center
    input
      width: 100%
      padding: 8px 0 8px 10px
    .generate-link
      display: inline-block
      padding: 0 10px
      margin-top: 20px
      background-color: #3f51b5
      line-height: 36px
      color: #fff
</style>