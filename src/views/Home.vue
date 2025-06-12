<template>
  <div class="home-page">
    <Header />
    
    <div class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">探索世界的每一个角落</h1>
        <p class="hero-subtitle">发现令人惊叹的景点和难忘的旅行体验</p>
        <el-input
          v-model="searchQuery"
          placeholder="搜索景点、城市..."
          prefix-icon="Search"
          @keyup.enter="search"
          class="hero-search"
        />
        <el-button @click="search" type="primary" class="hero-button">搜索</el-button>
      </div>
    </div>
    
    <div class="main-content">
      <div class="container">
        <!-- 景点分类导航 -->
        <div class="attraction-categories">
          <h2 class="section-title">景点分类</h2>
          <div class="category-tabs">
            <el-tabs v-model="activeCategory" @tab-click="handleCategoryClick">
              <el-tab-pane label="全部" name="all"></el-tab-pane>
              <el-tab-pane label="自然风光" name="自然风光"></el-tab-pane>
              <el-tab-pane label="历史文化" name="历史文化"></el-tab-pane>
              <el-tab-pane label="亲子乐园" name="亲子乐园"></el-tab-pane>
              <el-tab-pane label="网红打卡" name="网红打卡"></el-tab-pane>
            </el-tabs>
          </div>
          
          <div class="region-filters">
            <el-button-group>
              <el-button @click="handleRegionClick('all')" :type="activeRegion === 'all' ? 'primary' : ''">全部</el-button>
              <el-button @click="handleRegionClick('国内')" :type="activeRegion === '国内' ? 'primary' : ''">国内</el-button>
              <el-button @click="handleRegionClick('东南亚')" :type="activeRegion === '东南亚' ? 'primary' : ''">东南亚</el-button>
              <el-button @click="handleRegionClick('欧洲')" :type="activeRegion === '欧洲' ? 'primary' : ''">欧洲</el-button>
              <el-button @click="handleRegionClick('美洲')" :type="activeRegion === '美洲' ? 'primary' : ''">美洲</el-button>
            </el-button-group>
          </div>
        </div>
        
        <!-- 推荐景点 -->
        <div class="recommended-attractions">
          <h2 class="section-title">推荐景点</h2>
          <div class="attractions-grid">
            <AttractionCard 
              v-for="attraction in filteredAttractions" 
              :key="attraction.id" 
              :attraction="attraction" 
            />
          </div>
          
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[6, 12, 18]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="filteredAttractions.length"
          >
          </el-pagination>
        </div>
        
        <!-- 特色专题 -->
        <div class="featured-topics">
          <h2 class="section-title">特色专题</h2>
          <div class="topics-grid">
            <div class="topic-card" v-for="topic in featuredTopics" :key="topic.id" @click="goToTopic(topic)">
              <div class="topic-image">
                <img :src="topic.image" :alt="topic.title" />
              </div>
              <div class="topic-content">
                <h3 class="topic-title">{{ topic.title }}</h3>
                <p class="topic-description">{{ topic.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <Footer />
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import AttractionCard from '../components/AttractionCard.vue';

const router = useRouter();
const store = useStore();

const searchQuery = ref('');
const activeCategory = ref('all');
const activeRegion = ref('all');
const currentPage = ref(1);
const pageSize = ref(6);

const attractions = computed(() => store.state.attractions);

const filteredAttractions = computed(() => {
  let result = [...attractions.value];
  
  // 按分类筛选
  if (activeCategory.value !== 'all') {
    result = result.filter(attraction => attraction.tags.includes(activeCategory.value));
  }
  
  // 按地区筛选
  if (activeRegion.value !== 'all') {
    result = result.filter(attraction => {
      if (activeRegion.value === '国内') {
        return attraction.location.includes('中国');
      } else {
        return attraction.location.includes(activeRegion.value);
      }
    });
  }
  
  return result;
});

const featuredTopics = [
  {
    id: 1,
    title: "夏季避暑胜地TOP3",
    description: "逃离酷暑，探索清凉秘境",
    image: "https://picsum.photos/id/10/800/400"
  },
  {
    id: 2,
    title: "国庆黄金周人少景美目的地",
    description: "避开人群，享受宁静假期",
    image: "https://picsum.photos/id/15/800/400"
  },
  {
    id: 3,
    title: "亲子游必去3个景点",
    description: "与孩子一起创造美好回忆",
    image: "https://picsum.photos/id/20/800/400"
  }
];

const search = () => {
  if (searchQuery.value) {
    router.push({ name: 'Search', query: { keyword: searchQuery.value } });
    searchQuery.value = '';
  }
};

const handleCategoryClick = (tab) => {
  activeCategory.value = tab.name;
  currentPage.value = 1;
};

const handleRegionClick = (region) => {
  activeRegion.value = region;
  currentPage.value = 1;
};

const handleSizeChange = (newSize) => {
  pageSize.value = newSize;
};

const handleCurrentChange = (newPage) => {
  currentPage.value = newPage;
};

const goToTopic = (topic) => {
  // 这里应该导航到专题详情页，现在只是简单提示
  alert(`即将查看专题: ${topic.title}`);
};
</script>

<style scoped>
.home-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.hero-section {
  height: 600px;
  background-image: url('https://picsum.photos/id/1036/1920/1080');
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  position: relative;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  position: relative;
  z-index: 10;
}

.hero-title {
  font-size: 48px;
  margin-bottom: 20px;
}

.hero-subtitle {
  font-size: 24px;
  margin-bottom: 40px;
}

.hero-search {
  width: 400px;
  margin: 0 auto 20px;
}

.hero-button {
  padding: 12px 30px;
  font-size: 18px;
}

.main-content {
  flex: 1;
  padding: 50px 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.section-title {
  font-size: 28px;
  margin-bottom: 30px;
  color: #333;
}

.attraction-categories {
  margin-bottom: 50px;
}

.category-tabs {
  margin-bottom: 20px;
}

.region-filters {
  margin-bottom: 30px;
}

.attractions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.topics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: 20px;
}

.topic-card {
  border: 1px solid #e6e6e6;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.topic-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.topic-image {
  height: 200px;
  overflow: hidden;
}

.topic-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.topic-card:hover .topic-image img {
  transform: scale(1.1);
}

.topic-content {
  padding: 20px;
}

.topic-title {
  margin: 0 0 10px;
  font-size: 20px;
  color: #333;
}

.topic-description {
  margin: 0;
  color: #666;
}
</style>
