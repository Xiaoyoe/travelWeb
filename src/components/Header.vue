<template>
  <header class="header">
    <div class="container">
      <div class="header-left">
        <router-link to="/" class="logo">旅行指南</router-link>
      </div>
      
      <div class="header-center">
        <el-input
          v-model="searchQuery"
          placeholder="搜索景点、城市..."
          prefix-icon="Search"
          @keyup.enter="search"
        />
        <el-button @click="search" type="primary">搜索</el-button>
      </div>
      
      <div class="header-right">
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            <i class="el-icon-user"></i>
            {{ userInfo.nickname || '登录/注册' }}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item v-if="!userInfo.nickname" command="login">登录</el-dropdown-item>
              <el-dropdown-item v-if="!userInfo.nickname" command="register">注册</el-dropdown-item>
              <el-dropdown-item v-if="userInfo.nickname" command="profile">个人中心</el-dropdown-item>
              <el-dropdown-item v-if="userInfo.nickname" command="favorites">我的收藏</el-dropdown-item>
              <el-dropdown-item v-if="userInfo.nickname" command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const router = useRouter();
const store = useStore();

const searchQuery = ref('');
const userInfo = computed(() => store.state.user);

const search = () => {
  if (searchQuery.value) {
    router.push({ name: 'Search', query: { keyword: searchQuery.value } });
    searchQuery.value = '';
  }
};

const handleCommand = (command) => {
  switch (command) {
    case 'login':
      router.push({ name: 'Login' });
      break;
    case 'register':
      router.push({ name: 'Register' });
      break;
    case 'profile':
      router.push({ name: 'Profile' });
      break;
    case 'favorites':
      router.push({ name: 'Favorites' });
      break;
    case 'logout':
      store.dispatch('logout');
      break;
  }
};
</script>

<style scoped>
.header {
  background-color: #3498db;
  color: white;
  padding: 10px 0;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.header-left {
  display: flex;
  align-items: center;
}

.logo {
  font-size: 24px;
  font-weight: bold;
  color: white;
  text-decoration: none;
}

.header-center {
  flex: 1;
  max-width: 500px;
  margin: 0 20px;
  display: flex;
  gap: 10px;
}

.header-right {
  display: flex;
  align-items: center;
}

.el-dropdown-link {
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
}
</style>
