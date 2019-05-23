<template>
  <div class="wrapper">
    <Header :headinfo="headinfo"></Header>
    <div>
      <input class="searcbody" v-model="inputinfo" @keyup.enter="search(inputinfo)" />
    </div>
    <div class="list" v-if="friendsList!==null">
      <mu-list v-for="(key, index) in friendsList" :key="index">
        <mu-list-item>{{key.username}}</mu-list-item>
      </mu-list>
    </div>
    <div v-else>
      暂无好友
    </div>
  </div>
</template>
<script>
  import Header from '@components/Header';
  import api from '../api/server';
  export default {
    data() {
      return {
        headinfo: '添加好友',
        inputinfo: '',
        friendsList: null
      };
    },
    components: {
      Header: Header
    },
    created() {
      api.GetFriendsList().then(res => {
        this.friendsList = res.data.data;
        if (res.data.data === null) {
          this.friendsList = [];
        }
      }).catch(err => {
        console.log(err);
      });
    },
    methods: {
      search(val) {
        const searchdata = {
          username: val
        };
        api.AddGoodFriends(searchdata).then(res => {
          console.log(res);
        });
      }
    }
  };
</script>
<style scoped>
  .searcbody {
    width: 100%;
    height: 50px;
    line-height: 40px;
    position: fixed;
    border: 1px solid red;
    text-align: center;
    margin-top: 2rem;
  }
  .list{
    position: fixed;
    top: 7rem;
    left: 0;
    right: 0;
    bottom: 0;
  }
</style>
