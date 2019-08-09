<template>
  <div id="app">
    <van-loading v-show ="isLoading" color="#1D6BD6"/>
    <router-view :key="key"/>
  </div>
</template>

<script>
	import { mapState } from 'vuex'
  export default {
    computed: {
      ...mapState({
				isLoading: state => state.isLoading
			}),
      // 触使路由更新，数据重新加载
      key(){
        return this.$route.path + Math.random();
      } 
    },
  }
</script>



<style lang="less">
	@import './styles/common.less';
  html,
	body {
		height: 100%;
		width: 100%;
		overflow-x: hidden;
	}
  #app {
    height: 100%; 
		overflow: hidden;
    .van-loading {
      position: absolute;
      bottom: 50%;
      right: 50%;
      transform: translate(50%, 50%);
      z-index: 999;
    }
  }
</style>
