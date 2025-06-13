<template>
  <div class="profile-page">
    <Header />
    
    <div class="main-content">
      <div class="container">
        <div class="profile-container">
          <div class="profile-sidebar">
            <div class="user-info">
              <div class="user-avatar">
                <img src="https://picsum.photos/id/1005/200/200" alt="用户头像" />
              </div>
              <h3 class="user-name">{{ userInfo.nickname || '未设置昵称' }}</h3>
              <p class="user-email">{{ userInfo.email || '未设置邮箱' }}</p>
              <div class="user-details">
                <p v-if="userInfo.frequentCity">
                  <i class="el-icon-location"></i> 常去城市: {{ userInfo.frequentCity }}
                </p>
                <p v-if="userInfo.preferences?.length">
                  <i class="el-icon-star-off"></i> 偏好: {{ userInfo.preferences.join('、') }}
                </p>
              </div>
            </div>
            
            <div class="sidebar-menu">
              <el-menu
                router
                :default-active="activeMenu"
                @select="handleMenuSelect"
              >
                <el-menu-item index="profile">
                  <i class="el-icon-user"></i>
                  <span>个人信息</span>
                </el-menu-item>
                <el-menu-item index="favorites">
                  <i class="el-icon-heart"></i>
                  <span>我的收藏</span>
                </el-menu-item>
                <el-menu-item index="reviews">
                  <i class="el-icon-edit"></i>
                  <span>我的点评</span>
                </el-menu-item>
                <el-menu-item index="security">
                  <i class="el-icon-lock"></i>
                  <span>账号安全</span>
                </el-menu-item>
              </el-menu>
            </div>
          </div>
          
          <div class="profile-content">
            <component :is="currentComponent" />
          </div>
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
import { ElMessage } from 'element-plus';
import api from '../services/api';
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import UserInfoForm from '../components/UserInfoForm.vue';
import FavoritesList from '../components/FavoritesList.vue';
import UserReviews from '../components/UserReviews.vue';
import SecuritySettings from '../components/SecuritySettings.vue';

const router = useRouter();
const route = useRoute();
const store = useStore();

const userInfo = computed(() => store.state.user?.user || {});

// 获取用户信息
onMounted(async () => {
  try {
    const userId = store.state.user?.user?.id;
    if (!userId) {
      console.error('用户ID未找到，请先登录');
      router.push('/login');
      return;
    }
    const response = await api.getUserInfo(userId);
    if (!response?.data) {
      throw new Error('获取用户信息失败');
    }
    store.commit('user/SET_USER', response.data);
  } catch (error) {
    console.error('获取用户信息出错:', error);
    ElMessage.error('获取用户信息失败，请稍后再试');
    console.error('获取用户信息失败:', error);
  }
});

const activeMenu = ref('profile');
const currentComponent = ref('UserInfoForm');

const componentsMap = {
  profile: UserInfoForm,
  favorites: FavoritesList,
  reviews: UserReviews,
  security: SecuritySettings
};

// 监听路由变化，更新当前菜单
watch(() => route.name, (newName) => {
  if (newName === 'Profile') {
    activeMenu.value = 'profile';
  } else if (newName === 'Favorites') {
    activeMenu.value = 'favorites';
  } else if (newName === 'Reviews') {
    activeMenu.value = 'reviews';
  } else if (newName === 'Security') {
    activeMenu.value = 'security';
  }
  currentComponent.value = componentsMap[activeMenu.value];
}, { immediate: true });

const handleMenuSelect = (index) => {
  activeMenu.value = index;
  currentComponent.value = componentsMap[index];
  
  if (index === 'favorites') {
    router.push({ name: 'Favorites' });
  } else if (index === 'reviews') {
    router.push({ name: 'Reviews' });
  } else if (index === 'security') {
    router.push({ name: 'Security' });
  } else {
    router.push({ name: 'Profile' });
  }
};
</script>

<style scoped>
.profile-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
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

.profile-container {
  display: flex;
  gap: 30px;
}

.profile-sidebar {
  width: 250px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.user-info {
  text-align: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
}

.user-avatar {
  width: 100px;
  height: 100px;
  margin: 0 auto 15px;
  border-radius: 50%;
  overflow: hidden;
}

.user-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-name {
  margin: 0 0 5px;
  font-size: 18px;
  color: #333;
}

.user-email {
  margin: 0;
  color: #666;
  font-size: 14px;
}

.user-details {
  margin-top: 15px;
}

.user-details p {
  margin: 8px 0;
  color: #555;
  font-size: 14px;
  display: flex;
  align-items: center;
}

.user-details i {
  margin-right: 8px;
  color: #409EFF;
}

.sidebar-menu {
  border-right: none;
}

.profile-content {
  flex: 1;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  padding: 30px;
}
</style>
