<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-section">
          <h3>关于我们</h3>
          <p>旅行指南致力于为旅行者提供最全面、最实用的旅游信息。</p>
        </div>
        
        <div class="footer-section">
          <h3>联系方式</h3>
          <p>邮箱：contact@travelguide.com</p>
          <p>电话：400-123-4567</p>
        </div>
        
        <div class="footer-section">
          <h3>关注我们</h3>
          <div class="social-icons">
            <i class="el-icon-weibo"></i>
            <i class="el-icon-wechat"></i>
            <i class="el-icon-qq"></i>
          </div>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p>&copy; 2023 旅行指南. 保留所有权利.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
</script>

<style scoped>
.footer {
  background-color: #333;
  color: white;
  padding: 40px 0;
  margin-top: 50px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.footer-section {
  flex: 1;
  min-width: 200px;
  margin-bottom: 20px;
  padding: 0 20px;
}

.footer-section h3 {
  margin-bottom: 15px;
  font-size: 18px;
}

.social-icons {
  display: flex;
  gap: 15px;
  font-size: 20px;
}

.footer-bottom {
  text-align: center;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #444;
}
</style>
