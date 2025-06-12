<template>
  <div class="security-settings">
    <h2 class="settings-title">账号安全</h2>
    
    <el-form :model="passwordForm" :rules="passwordRules" ref="passwordFormRef" label-width="120px">
      <el-form-item label="当前密码" prop="currentPassword">
        <el-input v-model="passwordForm.currentPassword" type="password" />
      </el-form-item>
      
      <el-form-item label="新密码" prop="newPassword">
        <el-input v-model="passwordForm.newPassword" type="password" />
      </el-form-item>
      
      <el-form-item label="确认新密码" prop="confirmPassword">
        <el-input v-model="passwordForm.confirmPassword" type="password" />
      </el-form-item>
      
      <el-form-item>
        <el-button type="primary" @click="handleChangePassword">修改密码</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';

const passwordFormRef = ref(null);

const passwordForm = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
});

const validatePassword = (rule, value, callback) => {
  if (value.length < 6) {
    callback(new Error('密码长度不能少于6位'));
  } else {
    callback();
  }
};

const validateConfirmPassword = (rule, value, callback) => {
  if (value !== passwordForm.newPassword) {
    callback(new Error('两次输入的密码不一致'));
  } else {
    callback();
  }
};

const passwordRules = {
  currentPassword: [
    { required: true, message: '请输入当前密码', trigger: 'blur' }
  ],
  newPassword: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { validator: validatePassword, trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请确认新密码', trigger: 'blur' },
    { validator: validateConfirmPassword, trigger: 'blur' }
  ]
};

const handleChangePassword = () => {
  passwordFormRef.value.validate((valid) => {
    if (valid) {
      // 模拟修改密码
      alert('密码修改成功');
      passwordForm.currentPassword = '';
      passwordForm.newPassword = '';
      passwordForm.confirmPassword = '';
    } else {
      return false;
    }
  });
};
</script>

<style scoped>
.security-settings {
  max-width: 600px;
  margin: 0 auto;
}

.settings-title {
  font-size: 24px;
  margin-bottom: 30px;
  color: #333;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}
</style>
