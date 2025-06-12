<template>
  <div class="search-page">
    <Header />
    
    <div class="search-container">
      <h1 class="search-title">搜索: "{{ keyword }}"</h1>
      
      <div v-if="filteredAttractions.length > 0" class="search-results">
        <div class="results-count">找到 {{ filteredAttractions.length }} 个结果</div>
        <div class="attractions-grid">
          <AttractionCard 
            v-for="attraction in filteredAttractions" 
            :key="attraction.id" 
            :attraction="attraction"
            @toggle-favorite="toggleFavorite"
          />
        </div>
      </div>
      
      <div v-else class="empty-state">
        <el-empty description="没有找到相关景点">
          <el-button type="primary" @click="$router.push('/')">返回首页</el-button>
        </el-empty>
      </div>
    </div>
    
    <Footer />
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import AttractionCard from '../components/AttractionCard.vue';

const route = useRoute();
const store = useStore();

const keyword = ref(route.query.q || '');

// 监听路由参数变化
watch(() => route.query.q, (newVal, oldVal) => {
  console.log('路由参数变化:', { oldVal, newVal });
  keyword.value = newVal || '';
}, { immediate: true });

// 搜索逻辑
const filteredAttractions = computed(() => {
  if (!keyword.value) return [];
  
  const searchTerm = keyword.value.toLowerCase();
  return store.state.attractions.filter(attraction => {
    return (
      attraction.name.toLowerCase().includes(searchTerm) ||
      attraction.description.toLowerCase().includes(searchTerm) ||
      attraction.location.toLowerCase().includes(searchTerm) ||
      attraction.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  });
});

// 收藏功能
const toggleFavorite = (attractionId) => {
  store.commit('toggleFavorite', attractionId);
};
</script>

<style scoped>
.search-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.search-container {
  flex: 1;
  padding: 40px 20px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.search-title {
  font-size: 28px;
  margin-bottom: 30px;
  color: #333;
}

.results-count {
  margin-bottom: 20px;
  color: #666;
}

.attractions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.empty-state {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
}

@media (max-width: 768px) {
  .attractions-grid {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  }
}
</style>