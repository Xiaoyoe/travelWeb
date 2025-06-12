<template>
  <div class="favorites-list">
    <h2 class="list-title">我的收藏</h2>
    
    <div v-if="favorites.length" class="attractions-grid">
      <AttractionCard 
        v-for="attractionId in favorites" 
        :key="attractionId" 
        :attraction="getAttractionById(attractionId)" 
      />
    </div>
    
    <div v-else class="empty-state">
      <i class="el-icon-heart-outlined"></i>
      <p>您还没有收藏任何景点</p>
      <el-button type="primary" @click="goToExplore">去探索</el-button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import AttractionCard from './AttractionCard.vue';

const router = useRouter();
const store = useStore();

const favorites = computed(() => store.state.favorites);
const attractions = computed(() => store.state.attractions);

const getAttractionById = (id) => {
  return attractions.value.find(attr => attr.id === id);
};

const goToExplore = () => {
  router.push({ name: 'Home' });
};
</script>

<style scoped>
.favorites-list {
  max-width: 1000px;
  margin: 0 auto;
}

.list-title {
  font-size: 24px;
  margin-bottom: 30px;
  color: #333;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}

.attractions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
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
  margin-bottom: 30px;
}
</style>
