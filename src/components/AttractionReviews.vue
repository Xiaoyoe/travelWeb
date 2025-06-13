<template>
  <div class="attraction-reviews">
    <h2 class="section-title">用户点评</h2>
    
    <div class="rating-summary">
      <div class="average-rating">
        <span class="rating-value">{{ attraction.rating }}</span>
        <span class="rating-text">分</span>
      </div>
      
      <div class="rating-bars">
        <div class="rating-bar" v-for="(item, index) in ratingDistribution" :key="index">
          <span class="label">{{ item.label }}:</span>
          <div class="progress">
            <div class="progress-bar" :style="{ width: item.percentage + '%' }"></div>
          </div>
          <span class="percentage">{{ item.percentage }}%</span>
        </div>
      </div>
    </div>
    
    <div class="reviews-list">
      <div class="review-item" v-for="review in attraction.reviews" :key="review.id">
        <div class="review-header">
          <img :src="review.userAvatar" :alt="review.userName" class="user-avatar" />
          <div class="user-info">
            <h4 class="user-name">{{ review.userName }}</h4>
            <div class="review-date">{{ review.date }}</div>
          </div>
          <div class="user-rating">
            <el-rate :value="review.rating" :disabled="true" show-text text-color="#ff9900" />
          </div>
        </div>
        
        <div class="review-content">
          <p>{{ review.content }}</p>
          <div class="review-images" v-if="review.images.length">
            <img :src="img" :alt="review.userName + '的点评图片'" class="review-image" v-for="(img, index) in review.images" :key="index" />
          </div>
        </div>
      </div>
    </div>
    
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 20]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="attraction?.reviews?.length || 0"
    >
    </el-pagination>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  attraction: {
    type: Object,
    required: true
  }
});

const currentPage = ref(1);
const pageSize = ref(5);

const ratingDistribution = [
  { label: '5分', percentage: 45 },
  { label: '4分', percentage: 30 },
  { label: '3分', percentage: 15 },
  { label: '2分', percentage: 8 },
  { label: '1分', percentage: 2 }
];

const handleSizeChange = (newSize) => {
  pageSize.value = newSize;
};

const handleCurrentChange = (newPage) => {
  currentPage.value = newPage;
};
</script>

<style scoped>
.attraction-reviews {
  margin-bottom: 30px;
}

.section-title {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}

.rating-summary {
  display: flex;
  align-items: center;
  gap: 50px;
  margin-bottom: 30px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
}

.average-rating {
  text-align: center;
}

.rating-value {
  font-size: 48px;
  font-weight: bold;
  color: #ff9900;
}

.rating-text {
  font-size: 16px;
  color: #666;
}

.rating-bars {
  flex: 1;
}

.rating-bar {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.label {
  width: 60px;
  text-align: right;
  color: #666;
}

.progress {
  flex: 1;
  height: 10px;
  background-color: #eee;
  border-radius: 5px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background-color: #ff9900;
}

.percentage {
  width: 40px;
  text-align: left;
  color: #666;
}

.reviews-list {
  margin-bottom: 20px;
}

.review-item {
  padding: 20px 0;
  border-bottom: 1px solid #eee;
}

.review-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
}

.user-info {
  flex: 1;
}

.user-name {
  margin: 0;
  font-size: 16px;
  color: #333;
}

.review-date {
  font-size: 14px;
  color: #999;
}

.review-content {
  margin-bottom: 15px;
}

.review-images {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.review-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
}
</style>
