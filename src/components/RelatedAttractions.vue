<template>
  <div class="related-attractions">
    <h2 class="section-title">相关推荐</h2>
    
    <div class="attractions-grid">
      <AttractionCard 
        v-for="attraction in relatedAttractions" 
        :key="attraction.id" 
        :attraction="attraction" 
      />
    </div>
  </div>
</template>

<script setup>
import AttractionCard from './AttractionCard.vue';
import { computed } from 'vue';
import { useStore } from 'vuex';

const props = defineProps({
  currentAttraction: {
    type: Object,
    required: true
  }
});

const store = useStore();

const relatedAttractions = computed(() => {
  // 筛选出与当前景点同类型或同地区的景点
  return store.state.attractions
    .filter(attr => 
      attr.id !== props.currentAttraction.id && 
      (attr.tags.some(tag => props.currentAttraction.tags.includes(tag)) || 
       attr.location.includes(props.currentAttraction.location.split(' ')[0]))
    )
    .slice(0, 4);
});
</script>

<style scoped>
.related-attractions {
  margin-bottom: 30px;
}

.section-title {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}

.attractions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}
</style>
