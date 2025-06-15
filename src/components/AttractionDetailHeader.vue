<template>
  <div class="detail-header">
    <div class="image-slider">
      <el-carousel indicator-position="outside" height="500px">
        <el-carousel-item v-for="(image, index) in attraction.images" :key="index">
          <img :src="image" :alt="attraction.name" class="carousel-image" />
        </el-carousel-item>
      </el-carousel>
    </div>
    
    <div class="info-container">
      <div class="attraction-info">
        <div class="tags">
          <el-tag v-for="tag in attraction.tags" :key="tag" :type="getTagType(tag)">{{ tag }}</el-tag>
        </div>
        
        <h1 class="name">{{ attraction.name }}</h1>
        
        <div class="location-rating">
          <span class="location"><i class="el-icon-location-outline"></i> {{ attraction.location }}</span>
          <span class="rating"><i class="el-icon-star-on"></i> {{ attraction.rating }} ({{ attraction.reviewCount }}条评价)</span>
        </div>
        
        <div class="basic-info">
          <div class="info-item">
            <span class="label">开放时间:</span>
            <span class="value">{{ attraction.openTime }}</span>
          </div>
          <div class="info-item">
            <span class="label">门票价格:</span>
            <span class="value">¥{{ attraction.discountPrice || attraction.price }}</span>
          </div>
          <div class="info-item">
            <span class="label">建议游玩:</span>
            <span class="value">{{ attraction.suggestedDuration }}</span>
          </div>
        </div>
      </div>
      
      <div class="action-buttons">
        <el-button 
          type="success" 
          size="large" 
          icon="Calendar"
        >
          预订行程
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';

const props = defineProps({
  attraction: {
    type: Object,
    required: true
  }
});

const store = useStore();

const isFavorite = computed(() => {
  return false;
});

const toggleFavorite = () => {
  store.dispatch('toggleFavorite', props.attraction.id);
};

const getTagType = (tag) => {
  const tagTypes = {
    '自然风光': 'success',
    '历史文化': 'info',
    '亲子乐园': 'warning',
    '网红打卡': 'danger'
  };
  return tagTypes[tag] || 'primary';
};
</script>

<style scoped>
.detail-header {
  margin-bottom: 30px;
}

.image-slider {
  position: relative;
}

.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.info-container {
  max-width: 1200px;
  margin: -80px auto 0;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  padding: 30px;
  position: relative;
  z-index: 10;
}

.attraction-info {
  margin-bottom: 20px;
}

.tags {
  margin-bottom: 15px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.name {
  margin: 0 0 15px;
  font-size: 28px;
  color: #333;
}

.location-rating {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
  color: #666;
  font-size: 16px;
}

.basic-info {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #666;
}

.label {
  font-weight: bold;
}

.action-buttons {
  display: flex;
  gap: 15px;
}

.favorited {
  background-color: #f56c6c;
  border-color: #f56c6c;
}
</style>
