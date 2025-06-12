<template>
  <div class="attraction-map">
    <h2 class="section-title">景点位置</h2>
    
    <div class="map-container">
      <!-- 这里将在实际项目中替换为真实的地图组件 -->
      <div class="map-placeholder">
        <i class="el-icon-location-outline"></i>
        <p>地图加载中...</p>
      </div>
    </div>
    
    <div class="location-info">
      <p><i class="el-icon-location-outline"></i> {{ attraction.location }}</p>
      <p><i class="el-icon-phone"></i> {{ attraction.phone }}</p>
      <p><i class="el-icon-link"></i> <a :href="attraction.website" target="_blank">{{ attraction.website }}</a></p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  attraction: {
    type: Object,
    required: true
  }
});
</script>

<style scoped>
.attraction-map {
  margin-bottom: 30px;
}

.section-title {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}

.map-container {
  height: 400px;
  background-color: #f5f5f5;
  border-radius: 8px;
  margin-bottom: 20px;
  overflow: hidden;
  position: relative;
}

.map-placeholder {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: #999;
  font-size: 18px;
}

.map-placeholder i {
  font-size: 60px;
  margin-bottom: 15px;
}

.location-info {
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: #666;
}

.location-info a {
  color: #3498db;
  text-decoration: none;
}

.location-info a:hover {
  text-decoration: underline;
}
</style>
