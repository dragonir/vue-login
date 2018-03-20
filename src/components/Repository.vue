<template>
  <div class="w repository">
    <ul>
      <li class="item" v-for="(item, index) in list" :key="index">
        <div class="item-top">
          <div class="item-top-left">
            <h2>{{item.name}}</h2>
            <p>{{item.description}}</p>
          </div>
          <img :src="item.owner.avatar_url" alt="" width="60" height="60">
        </div>
        <div class="item-bottom">
          <i class="fa fa-map-marker"></i>
          <span>{{item.language}}</span>
          <i class="fa fa-clock-o"></i>
          <span>{{item.updated_at}}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        list: []
      };
    },
    created() {
      this.$store.commit('title', 'Repositories');
      this.getRepositoryList();
    },
    methods: {
      getRepositoryList() {
        const url = '/user/repos';
        const params = { sort: 'updated' };
        this.$axios.get(url, { params }).then(res => {
          this.list = res.data;
        });
      }
    }
  }
</script>

<style scoped lang="stylus">
.repository
  display: flex
  justify-content: center
  .item
    width: 600px
    height: 180px
    padding: 0 40px
    margin-top: 20px
    box-shadow: 0 0 5px rgba(0, 0, 0, .2);
    transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
    &:hover
      cursor: pointer;
      box-shadow: 0 8px 20px rgba(0, 0, 0, .2);
    .item-top
      height: 100px
      display: flex
      justify-content: space-between
      align-items: center
      .item-top-left
        h2
          line-height: 40px
    .item-bottom
      i, span
        margin: 0 5px
</style>