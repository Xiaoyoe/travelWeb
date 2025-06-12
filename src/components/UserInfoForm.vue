<template>
  <div class="user-info-form">
    <h2 class="form-title">个人信息</h2>
    
    <el-form :model="userInfo" :rules="userInfoRules" ref="userInfoFormRef" label-width="120px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="userInfo.username" disabled />
      </el-form-item>
      
      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="userInfo.nickname" />
      </el-form-item>
      
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="userInfo.email" />
      </el-form-item>
      
      <el-form-item label="常用出行城市" prop="frequentCity">
        <el-input v-model="userInfo.frequentCity" placeholder="例如：北京，上海，广州" />
      </el-form-item>
      
      <el-form-item label="偏好标签" prop="preferences">
        <el-checkbox-group v-model="userInfo.preferences">
          <el-checkbox label="自然风光爱好者" name="nature"></el-checkbox>
          <el-checkbox label="历史控" name="history"></el-checkbox>
          <el-checkbox label="亲子家庭" name="family"></el-checkbox>
          <el-checkbox label="美食探索" name="food"></el-checkbox>
          <el-checkbox label="摄影爱好者" name="photography"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      
      <el-form-item>
        <el-button type="primary" @click="handleSave">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref, reactive, toRefs } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const userInfoFormRef = ref(null);

const userInfo = reactive({
  username: store.state.user.username || '',
  nickname: store.state.user.nickname || '',
  email: store.state.user.email || '',
  frequentCity: store.state.user.frequentCity || '',
  preferences: store.state.user.preferences || []
});

const userInfoRules = {
  nickname: [
    { required: true, message: '请输入昵称', trigger: 'blur' }
  ],
  email: [
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
  ]
};

const handleSave = () => {
  userInfoFormRef.value.validate((valid) => {
    if (valid) {
      // 保存用户信息
      store.dispatch('updateUserInfo', {
        nickname: userInfo.nickname,
        email: userInfo.email,
        frequentCity: userInfo.frequentCity,
        preferences: userInfo.preferences
      });
      alert('个人信息保存成功');
    } else {
      return false;
    }
  });
};
</script>

<style scoped>
.user-info-form {
  max-width: 600px;
  margin: 0 auto;
}

.form-title {
  font-size: 24px;
  margin-bottom: 30px;
  color: #333;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}
</style>
