<template>
  <div class="attraction-description">
    <h2 class="section-title">景点介绍</h2>
    
    <div class="content">
      <div class="description-text">
        <p>{{ attraction.description }}</p>
      </div>
      
      <div class="history">
        <h3>历史渊源</h3>
        <p>{{ attraction.history }}</p>
      </div>
      
      <div class="features">
        <h3>特色亮点</h3>
        <ul>
          <li v-for="(feature, index) in attraction.features" :key="index">{{ feature }}</li>
        </ul>
      </div>
      
      <div class="tips">
        <h3>游览小贴士</h3>
        <ul>
          <li v-for="(tip, index) in attraction.tips" :key="index">{{ tip }}</li>
        </ul>
      </div>
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
.attraction-description {
  margin-bottom: 30px;
}

.section-title {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}

.content {
  line-height: 1.8;
  color: #666;
}

.description-text,
.history,
.features,
.tips {
  margin-bottom: 25px;
}

h3 {
  font-size: 18px;
  margin-bottom: 15px;
  color: #333;
}

ul {
  padding-left: 20px;
  margin: 0;
  list-style: none;
}

li {
  margin-bottom: 10px;
}
</style>
