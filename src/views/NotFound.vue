<template>
  <div class="not-found-container">
    <el-empty 
      description="暂无该景点信息"
      :image-size="300">
      <el-button 
        type="primary"
        @click="goBack">
        返回首页
      </el-button>
    </el-empty>
  </div>
</template>

<script>
export default {
  methods: {
    goBack() {
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
.not-found-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
}
</style>