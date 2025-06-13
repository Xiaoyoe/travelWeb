<template>
  <div class="attraction-card" @click="goToDetail">
    <div class="card-image">
      <img :src="attraction.images?.[0] || ''" :alt="attraction.name" />
      <div class="image-overlay">
        <el-tag v-for="tag in attraction.tags" :key="tag" :type="getTagType(tag)">{{ tag }}</el-tag>
      </div>
    </div>
    
    <div class="card-content">
      <h3 class="card-title">{{ attraction.name }}</h3>
      <div class="card-info">
        <span class="location"><i class="el-icon-location-outline"></i> {{ attraction.location }}</span>
        <span class="rating"><i class="el-icon-star-on"></i> {{ attraction.rating }}</span>
      </div>
      <p class="card-description">{{ attraction.shortDescription }}</p>
    </div>
    
    <div class="card-footer">
      <div class="price">
        <span class="original-price" v-if="attraction.discountPrice">¥{{ attraction.price }}</span>
        <span class="current-price">¥{{ attraction.discountPrice || attraction.price }}</span>
      </div>
      <el-button 
        type="primary" 
        size="small" 
        @click.stop="toggleFavorite"
        :icon="isFavorite ? 'Heart' : 'HeartOutlined'"
      >
        {{ isFavorite ? '已收藏' : '收藏' }}
      </el-button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const props = defineProps({
  attraction: {
    type: Object,
    required: true
  }
});

const router = useRouter();
const store = useStore();

const isFavorite = computed(() => {
  return store.state.favorites?.includes(props.attraction.id) || false;
});

const toggleFavorite = () => {
  store.dispatch('toggleFavorite', props.attraction.id);
};

const goToDetail = () => {
  router.push({ name: 'AttractionDetail', params: { id: props.attraction.id } });
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
.attraction-card {
  border: 1px solid #e6e6e6;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.attraction-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.card-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.card-image:hover img {
  transform: scale(1.1);
}

.image-overlay {
  position: absolute;
  top: 10px;
  left: 10px;
  display: flex;
  gap: 5px;
}

.card-content {
  padding: 15px;
  flex: 1;
}

.card-title {
  margin: 0 0 10px;
  font-size: 18px;
  color: #333;
}

.card-info {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 10px;
  color: #666;
  font-size: 14px;
}

.card-description {
  margin: 0;
  color: #666;
  font-size: 14px;
  line-height: 1.5;
}

.card-footer {
  padding: 15px;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price {
  display: flex;
  align-items: center;
  gap: 10px;
}

.original-price {
  color: #999;
  text-decoration: line-through;
  font-size: 14px;
}

.current-price {
  color: #f56c6c;
  font-weight: bold;
  font-size: 18px;
}
</style>
