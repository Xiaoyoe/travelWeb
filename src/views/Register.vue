<template>
  <div class="register-page">
    <Header />
    
    <div class="main-content">
      <div class="container">
        <div class="form-container">
          <RegisterForm />
        </div>
      </div>
    </div>
    
    <Footer />
  </div>
</template>

<script setup>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import RegisterForm from '../components/RegisterForm.vue';
</script>

<style scoped>
.register-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f9f9f9;
}

.main-content {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 50px 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.form-container {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
}
</style>
