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
              <h3 class="user-name">{{ userInfo.nickname }}</h3>
              <p class="user-email">{{ userInfo.email || '未设置邮箱' }}</p>
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
import { ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex';
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import UserInfoForm from '../components/UserInfoForm.vue';
import FavoritesList from '../components/FavoritesList.vue';
import UserReviews from '../components/UserReviews.vue';
import SecuritySettings from '../components/SecuritySettings.vue';

const router = useRouter();
const route = useRoute();
const store = useStore();

const userInfo = computed(() => store.state.user);

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
    currentComponent.value = componentsMap[activeMenu.value];
  } else if (newName === 'Favorites') {
    activeMenu.value = 'favorites';
    currentComponent.value = componentsMap[activeMenu.value];
  }
});

const handleMenuSelect = (index) => {
  activeMenu.value = index;
  currentComponent.value = componentsMap[index];
  
  if (index === 'favorites') {
    router.push({ name: 'Favorites' });
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
