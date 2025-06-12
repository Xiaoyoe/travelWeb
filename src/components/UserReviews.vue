<template>
  <div class="user-reviews">
    <h2 class="reviews-title">我的点评</h2>
    
    <div class="review-item" v-for="review in userReviews" :key="review.id">
      <div class="review-header">
        <div class="attraction-info">
          <img :src="getAttractionById(review.attractionId)?.images[0]" :alt="getAttractionById(review.attractionId)?.name" class="attraction-image" />
          <div>
            <h3 class="attraction-name">{{ getAttractionById(review.attractionId)?.name }}</h3>
            <div class="review-date">{{ review.date }}</div>
          </div>
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
    
    <div v-if="!userReviews.length" class="empty-state">
      <i class="el-icon-edit"></i>
      <p>您还没有发表过任何点评</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const attractions = computed(() => store.state.attractions);

const userReviews = computed(() => {
  // 模拟用户点评数据
  return [
    {
      id: 1,
      attractionId: 'attraction-1',
      userName: store.state.user.nickname || '旅行者',
      userAvatar: 'https://picsum.photos/id/1005/200/200',
      rating: 5,
      content: '非常美丽的景点，值得一去！自然风光令人惊叹，空气清新，适合放松身心。',
      images: ['https://picsum.photos/id/10/400/300', 'https://picsum.photos/id/11/400/300'],
      date: '2023-05-15'
    },
    {
      id: 2,
      attractionId: 'attraction-3',
      userName: store.state.user.nickname || '旅行者',
      userAvatar: 'https://picsum.photos/id/1005/200/200',
      rating: 4,
      content: '历史文化氛围浓厚，建筑保存完好，讲解也很专业。唯一的缺点是节假日人太多了。',
      images: ['https://picsum.photos/id/20/400/300'],
      date: '2023-04-08'
    }
  ];
});

const getAttractionById = (id) => {
  return attractions.value.find(attr => attr.id === id);
};
</script>

<style scoped>
.user-reviews {
  max-width: 800px;
  margin: 0 auto;
}

.reviews-title {
  font-size: 24px;
  margin-bottom: 30px;
  color: #333;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}

.review-item {
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 8px;
  margin-bottom: 20px;
}

.review-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.attraction-info {
  display: flex;
  align-items: center;
}

.attraction-image {
  width: 60px;
  height: 60px;
  border-radius: 4px;
  object-fit: cover;
  margin-right: 15px;
}

.attraction-name {
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

.empty-state {
  text-align: center;
  padding: 50px 0;
}

.empty-state i {
  font-size: 60px;
  color: #ccc;
  margin-bottom: 20px;
}

.empty-state p {
  font-size: 18px;
  color: #666;
}
</style>
