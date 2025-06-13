<template>
  <div class="attraction-detail-page">
    <Header />
    
    <div class="main-content">
      <div class="container">
        <div v-if="attraction" class="detail-container">
          <AttractionDetailHeader :attraction="attraction" />
          
          <div class="detail-content">
            <div class="left-column">
              <AttractionDescription :attraction="attraction" />
              <AttractionReviews :attraction="attraction" />
              <AttractionMap :attraction="attraction" />
            </div>
            
            <div class="right-column">
              <div class="booking-card">
                <h3 class="card-title">立即预订</h3>
                <div class="price-info">
                  <span class="original-price" v-if="attraction.discountPrice">¥{{ attraction.price }}</span>
                  <span class="current-price">¥{{ attraction.discountPrice || attraction.price }}</span>
                  <span class="per-person">/人起</span>
                </div>
                
                <el-form :model="bookingForm" label-width="80px">
                  <el-form-item label="出行日期">
                    <el-date-picker
                      v-model="bookingForm.date"
                      type="date"
                      placeholder="选择日期"
                      :disabled-date="disabledDate"
                    />
                  </el-form-item>
                  
                  <el-form-item label="成人数量">
                    <el-input-number
                      v-model="bookingForm.adults"
                      :min="1"
                      :max="10"
                      controls-position="right"
                    />
                  </el-form-item>
                  
                  <el-form-item label="儿童数量">
                    <el-input-number
                      v-model="bookingForm.children"
                      :min="0"
                      :max="10"
                      controls-position="right"
                    />
                  </el-form-item>
                </el-form>
                
                <el-button type="primary" block @click="handleBooking">立即预订</el-button>
              </div>
              
              <RelatedAttractions :current-attraction="attraction" />
            </div>
          </div>
        </div>
        
        <div v-else class="loading">
          <el-skeleton animated />
        </div>
      </div>
    </div>
    
    <Footer />
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex';
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import AttractionDetailHeader from '../components/AttractionDetailHeader.vue';
import AttractionDescription from '../components/AttractionDescription.vue';
import AttractionReviews from '../components/AttractionReviews.vue';
import AttractionMap from '../components/AttractionMap.vue';
import RelatedAttractions from '../components/RelatedAttractions.vue';

const router = useRouter();
const route = useRoute();
const store = useStore();

const attractionId = computed(() => route.params.id);
const attraction = computed(() => {
  const current = store.getters['attraction/currentAttraction'];
  return {
    ...current,
    // 确保图片数据存在
    images: current?.images || [],
    // 确保描述数据存在
    description: current?.description || '暂无描述'
  };
});

onMounted(() => {
  store.dispatch('attraction/fetchAttractionById', attractionId.value);
});

watch(attractionId, (newId) => {
  store.dispatch('attraction/fetchAttractionById', newId);
});

const bookingForm = ref({
  date: null,
  adults: 2,
  children: 0
});

const disabledDate = (time) => {
  return time.getTime() < Date.now() - 8.64e7;
};

const handleBooking = () => {
  if (!bookingForm.value.date) {
    alert('请选择出行日期');
    return;
  }
  
  // 模拟预订流程
  alert(`已成功预订 ${attraction.value.name} 的行程，出行日期: ${bookingForm.value.date}`);
};

// 监听路由变化，重置表单
watch(attractionId, () => {
  bookingForm.value = {
    date: null,
    adults: 2,
    children: 0
  };
});
</script>

<style scoped>
.attraction-detail-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  padding: 20px 0 50px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.detail-container {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.detail-content {
  display: flex;
  gap: 30px;
  padding: 30px;
}

.left-column {
  flex: 3;
}

.right-column {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.booking-card {
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
}

.card-title {
  margin: 0 0 20px;
  font-size: 20px;
  color: #333;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}

.price-info {
  display: flex;
  align-items: baseline;
  gap: 10px;
  margin-bottom: 20px;
}

.original-price {
  color: #999;
  text-decoration: line-through;
  font-size: 16px;
}

.current-price {
  color: #f56c6c;
  font-weight: bold;
  font-size: 24px;
}

.per-person {
  color: #666;
  font-size: 14px;
}

.booking-form {
  margin-bottom: 20px;
}

.loading {
  padding: 50px;
}
</style>
