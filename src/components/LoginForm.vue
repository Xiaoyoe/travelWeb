<template>
  <div class="login-form">
    <h2 class="form-title">用户登录</h2>
    
    <el-form :model="loginForm" :rules="loginRules" ref="loginFormRef" label-width="80px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="loginForm.username" placeholder="请输入用户名" />
      </el-form-item>
      
      <el-form-item label="密码" prop="password">
        <el-input v-model="loginForm.password" type="password" placeholder="请输入密码" />
      </el-form-item>
      
      <el-form-item>
        <el-button type="primary" @click="handleLogin">登录</el-button>
        <el-button @click="handleRegister">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const router = useRouter();
const store = useStore();

const loginFormRef = ref(null);

const loginForm = reactive({
  username: '',
  password: ''
});

const loginRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能少于6位', trigger: 'blur' }
  ]
};

const handleLogin = async () => {
  loginFormRef.value.validate(async (valid) => {
    if (valid) {
      try {
        await store.dispatch('user/login', {
          username: loginForm.username,
          password: loginForm.password
        });
        
        // 直接跳转到用户界面
        router.push({ name: 'Profile' });
      } catch (error) {
        console.error('登录失败:', error);
      }
    }
  });
};

const handleRegister = () => {
  router.push({ name: 'Register' });
};
</script>

<style scoped>
.login-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 40px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.form-title {
  text-align: center;
  margin-bottom: 30px;
  font-size: 24px;
  color: #333;
}
</style>
