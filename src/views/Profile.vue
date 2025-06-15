<template>
  <div class="min-h-screen flex flex-col bg-neutral-100 text-neutral-600">
    <!-- 顶部导航栏 -->
    <header class="bg-white shadow-sm sticky top-0 z-50">
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-between h-16">
          <!-- Logo -->
          <a href="#" class="flex items-center space-x-2">
            <i class="fa fa-paper-plane text-primary text-2xl"></i>
            <span class="text-xl font-bold text-neutral-600">旅行者</span>
          </a>
          
          <!-- 主导航 -->
          <nav class="hidden md:flex items-center space-x-8">
            <a href="#" class="text-primary font-medium">首页</a>
            <a href="#" class="text-neutral-500 hover:text-primary transition-colors">目的地</a>
            <a href="#" class="text-neutral-500 hover:text-primary transition-colors">攻略</a>
            <a href="#" class="text-neutral-500 hover:text-primary transition-colors">社区</a>
            <a href="#" class="text-neutral-500 hover:text-primary transition-colors">优惠</a>
          </nav>
          
          <!-- 用户区域 -->
          <div class="flex items-center space-x-4">
            <button class="text-neutral-500 hover:text-primary transition-colors">
              <i class="fa fa-bell-o text-xl"></i>
            </button>
            <div class="relative group">
              <button class="flex items-center space-x-2">
                <img src="https://picsum.photos/id/64/40/40" alt="用户头像" class="w-8 h-8 rounded-full object-cover border-2 border-primary">
                <span class="text-sm font-medium">旅行达人</span>
                <i class="fa fa-angle-down text-neutral-400"></i>
              </button>
              <div class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-right scale-95 group-hover:scale-100">
                <a href="#" class="block px-4 py-2 text-sm text-neutral-600 hover:bg-primary/5 hover:text-primary">
                  <i class="fa fa-user-o mr-2"></i>个人资料
                </a>
                <a href="#" class="block px-4 py-2 text-sm text-neutral-600 hover:bg-primary/5 hover:text-primary">
                  <i class="fa fa-heart-o mr-2"></i>我的收藏
                </a>
                <a href="#" class="block px-4 py-2 text-sm text-neutral-600 hover:bg-primary/5 hover:text-primary">
                  <i class="fa fa-calendar-o mr-2"></i>我的行程
                </a>
                <a href="#" class="block px-4 py-2 text-sm text-neutral-600 hover:bg-primary/5 hover:text-primary">
                  <i class="fa fa-cog mr-2"></i>账号设置
                </a>
                <div class="border-t border-neutral-200 my-1"></div>
                <a href="#" class="block px-4 py-2 text-sm text-red-500 hover:bg-red-50">
                  <i class="fa fa-sign-out mr-2"></i>退出登录
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- 主内容区 -->
    <main class="flex-grow container mx-auto px-4 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- 左侧边栏 - 头像和基本信息 -->
        <div class="lg:col-span-1 space-y-6">
          <el-card class="card-hover bg-white rounded-xl shadow-sm overflow-hidden">
            <div class="p-6 text-center">
              <div class="relative mx-auto w-40 h-40">
                <el-avatar 
                  :src="userInfo.avatar || 'https://picsum.photos/id/64/200/200'" 
                  :size="160" 
                  class="border-4 border-primary/10"
                />
                <el-button 
                  type="primary" 
                  size="small" 
                  class="absolute -bottom-3 -right-3 flex items-center"
                >
                  <i class="fa fa-camera mr-1"></i> 更换
                </el-button>
              </div>
              
              <h2 class="text-xl font-bold text-neutral-700 mt-4">{{ userInfo.nickname || '旅行者一号' }}</h2>
              <p class="text-neutral-500 text-sm mb-4">{{ userInfo.username || 'traveler1' }}</p>
              
              <el-tag 
                :type="getMemberType(userInfo.memberLevel)" 
                size="medium"
                class="mb-4"
              >
                {{ userInfo.memberLevel || '普通会员' }}
              </el-tag>
              
              <div class="flex justify-center space-x-6 mb-6">
                <div class="text-center">
                  <p class="text-2xl font-semibold text-primary">{{ userInfo.travelCount || 0 }}</p>
                  <p class="text-xs text-neutral-400">旅行</p>
                </div>
                <div class="text-center">
                  <p class="text-2xl font-semibold text-primary">{{ userInfo.destinationCount || 0 }}</p>
                  <p class="text-xs text-neutral-400">目的地</p>
                </div>
                <div class="text-center">
                  <p class="text-2xl font-semibold text-primary">{{ userInfo.followerCount || 0 }}</p>
                  <p class="text-xs text-neutral-400">粉丝</p>
                </div>
              </div>
              
              <div class="flex flex-col gap-3">
                <el-button type="primary" size="medium" class="flex items-center justify-center">
                  <i class="fa fa-edit mr-2"></i> 编辑资料
                </el-button>
                <el-button type="text" size="medium" class="text-neutral-500 hover:text-primary flex items-center justify-center">
                  <i class="fa fa-cog mr-2"></i> 账号设置
                </el-button>
              </div>
            </div>
          </el-card>
          
          <!-- 个人简介 -->
          <el-card class="card-hover bg-white rounded-xl shadow-sm overflow-hidden">
            <div class="p-6">
              <h3 class="text-lg font-semibold text-neutral-700 mb-3">个人简介</h3>
              <p class="text-neutral-600 leading-relaxed">
                {{ userInfo.bio || '这位用户很懒，还没有填写个人简介...' }}
              </p>
            </div>
          </el-card>
          
          <!-- 会员信息 -->
          <el-card class="card-hover bg-white rounded-xl shadow-sm overflow-hidden">
            <div class="p-6">
              <h3 class="text-lg font-semibold text-neutral-700 mb-3">会员信息</h3>
              <div class="flex items-center justify-between mb-4">
                <div>
                  <p class="text-sm text-neutral-500">会员等级</p>
                  <p class="text-lg font-medium text-neutral-700">{{ userInfo.memberLevel || '普通会员' }}</p>
                </div>
                <div class="text-2xl">
                  <i class="fa fa-diamond text-primary"></i>
                </div>
              </div>
              <div class="flex items-center justify-between mb-4">
                <div>
                  <p class="text-sm text-neutral-500">会员到期</p>
                  <p class="text-lg font-medium text-neutral-700">{{ userInfo.membershipExpire || '2024-12-31' }}</p>
                </div>
                <el-button type="primary" size="small">续费</el-button>
              </div>
              <div class="text-sm text-neutral-500">
                <p>距离会员到期还有 <span class="text-primary font-medium">87</span> 天</p>
              </div>
            </div>
          </el-card>
        </div>
        
        <!-- 右侧内容区 - 详细信息和旅行记录 -->
        <div class="lg:col-span-2 space-y-6">
          <!-- 基本信息 -->
          <el-card class="card-hover bg-white rounded-xl shadow-sm overflow-hidden">
            <div class="p-6">
              <h3 class="text-xl font-semibold text-neutral-700 mb-6 pb-3 border-b border-neutral-100">
                <i class="fa fa-user-o mr-2"></i>基本信息
              </h3>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="space-y-5">
                  <div class="flex flex-col">
                    <label class="text-sm text-neutral-500 mb-1">邮箱</label>
                    <div class="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                      <span class="text-neutral-700">{{ userInfo.email || 'traveler1@example.com' }}</span>
                      <el-button type="text" size="small" class="text-primary">修改</el-button>
                    </div>
                  </div>
                  
                  <div class="flex flex-col">
                    <label class="text-sm text-neutral-500 mb-1">手机号码</label>
                    <div class="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                      <span class="text-neutral-700">{{ userInfo.phone || '138****6789' }}</span>
                      <el-button type="text" size="small" class="text-primary">修改</el-button>
                    </div>
                  </div>
                  
                  <div class="flex flex-col">
                    <label class="text-sm text-neutral-500 mb-1">常居城市</label>
                    <div class="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                      <span class="text-neutral-700">{{ userInfo.frequentCity || '北京' }}</span>
                      <el-button type="text" size="small" class="text-primary">修改</el-button>
                    </div>
                  </div>
                  
                  <div class="flex flex-col">
                    <label class="text-sm text-neutral-500 mb-1">出生日期</label>
                    <div class="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                      <span class="text-neutral-700">{{ userInfo.birthday || '1990-01-01' }}</span>
                      <el-button type="text" size="small" class="text-primary">修改</el-button>
                    </div>
                  </div>
                </div>
                
                <div class="space-y-5">
                  <div class="flex flex-col">
                    <label class="text-sm text-neutral-500 mb-1">性别</label>
                    <div class="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                      <span class="text-neutral-700">{{ userInfo.gender || '男' }}</span>
                      <el-button type="text" size="small" class="text-primary">修改</el-button>
                    </div>
                  </div>
                  
                  <div class="flex flex-col">
                    <label class="text-sm text-neutral-500 mb-1">职业</label>
                    <div class="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                      <span class="text-neutral-700">{{ userInfo.occupation || '设计师' }}</span>
                      <el-button type="text" size="small" class="text-primary">修改</el-button>
                    </div>
                  </div>
                  
                  <div class="flex flex-col">
                    <label class="text-sm text-neutral-500 mb-1">语言</label>
                    <div class="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                      <span class="text-neutral-700">{{ userInfo.language || '中文、英文' }}</span>
                      <el-button type="text" size="small" class="text-primary">修改</el-button>
                    </div>
                  </div>
                  
                  <div class="flex flex-col">
                    <label class="text-sm text-neutral-500 mb-1">微信号</label>
                    <div class="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                      <span class="text-neutral-700">{{ userInfo.wechat || 'traveler123' }}</span>
                      <el-button type="text" size="small" class="text-primary">修改</el-button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-card>
          
          <!-- 账号安全 -->
          <el-card class="card-hover bg-white rounded-xl shadow-sm overflow-hidden">
            <div class="p-6">
              <h3 class="text-xl font-semibold text-neutral-700 mb-6 pb-3 border-b border-neutral-100">
                <i class="fa fa-shield mr-2"></i>账号安全
              </h3>
              
              <div class="space-y-4">
                <div class="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
                  <div class="flex items-center">
                    <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-500 mr-3">
                      <i class="fa fa-lock"></i>
                    </div>
                    <div>
                      <h4 class="font-medium">登录密码</h4>
                      <p class="text-sm text-neutral-500">已设置，上次修改于2023-06-15</p>
                    </div>
                  </div>
                  <el-button type="text" size="medium" class="text-primary">修改</el-button>
                </div>
                
                <div class="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
                  <div class="flex items-center">
                    <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-500 mr-3">
                      <i class="fa fa-id-card-o"></i>
                    </div>
                    <div>
                      <h4 class="font-medium">实名认证</h4>
                      <p class="text-sm text-neutral-500">已认证，姓名：张三</p>
                    </div>
                  </div>
                  <el-button type="text" size="medium" class="text-neutral-400" disabled>查看</el-button>
                </div>
                
                <div class="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
                  <div class="flex items-center">
                    <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-500 mr-3">
                      <i class="fa fa-weixin"></i>
                    </div>
                    <div>
                      <h4 class="font-medium">绑定微信</h4>
                      <p class="text-sm text-neutral-500">已绑定，昵称：旅行达人</p>
                    </div>
                  </div>
                  <el-button type="text" size="medium" class="text-primary">管理</el-button>
                </div>
                
                <div class="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
                  <div class="flex items-center">
                    <div class="w-10 h-10 bg-neutral-100 rounded-full flex items-center justify-center text-neutral-500 mr-3">
                      <i class="fa fa-shield"></i>
                    </div>
                    <div>
                      <h4 class="font-medium">两步验证</h4>
                      <p class="text-sm text-neutral-500">未开启，增强账号安全</p>
                    </div>
                  </div>
                  <el-button type="primary" size="medium">开启</el-button>
                </div>
              </div>
            </div>
          </el-card>
          
          <!-- 兴趣偏好 -->
          <el-card class="card-hover bg-white rounded-xl shadow-sm overflow-hidden">
            <div class="p-6">
              <h3 class="text-xl font-semibold text-neutral-700 mb-4">
                <i class="fa fa-heart-o mr-2"></i>兴趣偏好
              </h3>
              
              <div class="flex flex-wrap gap-3">
                <el-tag 
                  v-for="(preference, index) in userInfo.preferences" 
                  :key="index"
                  type="info"
                  size="medium"
                  closable
                  @close="removePreference(index)"
                >
                  {{ preference }}
                </el-tag>
                
                <el-input 
                  v-model="newPreference" 
                  placeholder="添加兴趣" 
                  size="medium" 
                  class="w-56"
                  @keyup.enter="addPreference"
                >
                  <template #append>
                    <el-button icon="Plus" size="medium" @click="addPreference"></el-button>
                  </template>
                </el-input>
              </div>
            </div>
          </el-card>
          
          <!-- 最近旅行 -->
          <el-card class="card-hover bg-white rounded-xl shadow-sm overflow-hidden">
            <div class="p-6">
              <div class="flex justify-between items-center mb-6">
                <h3 class="text-xl font-semibold text-neutral-700">
                  <i class="fa fa-map-marker mr-2"></i>最近旅行
                </h3>
                <el-button type="text" size="medium" class="text-primary">查看全部</el-button>
              </div>
              
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <el-card class="card-hover p-0 overflow-hidden" shadow="hover">
                  <img src="https://picsum.photos/id/10/600/400" alt="杭州西湖" class="w-full h-48 object-cover">
                  <div class="p-5">
                    <div class="flex justify-between items-start mb-2">
                      <h4 class="font-semibold text-lg text-neutral-700">杭州西湖</h4>
                      <el-tag type="success" size="small">已完成</el-tag>
                    </div>
                    <p class="text-neutral-500 mt-1">2023-09-15 至 2023-09-18 · 3晚4天</p>
                    <div class="flex justify-between items-center mt-4">
                      <span class="text-primary font-medium">¥2,450</span>
                      <el-button type="text" size="small" class="text-primary">查看详情</el-button>
                    </div>
                  </div>
                </el-card>
                
                <el-card class="card-hover p-0 overflow-hidden" shadow="hover">
                  <img src="https://picsum.photos/id/20/600/400" alt="北京故宫" class="w-full h-48 object-cover">
                  <div class="p-5">
                    <div class="flex justify-between items-start mb-2">
                      <h4 class="font-semibold text-lg text-neutral-700">北京故宫</h4>
                      <el-tag type="success" size="small">已完成</el-tag>
                    </div>
                    <p class="text-neutral-500 mt-1">2023-07-05 至 2023-07-08 · 3晚4天</p>
                    <div class="flex justify-between items-center mt-4">
                      <span class="text-primary font-medium">¥3,180</span>
                      <el-button type="text" size="small" class="text-primary">查看详情</el-button>
                    </div>
                  </div>
                </el-card>
                
                <el-card class="card-hover p-0 overflow-hidden" shadow="hover">
                  <img src="https://picsum.photos/id/30/600/400" alt="成都锦里" class="w-full h-48 object-cover">
                  <div class="p-5">
                    <div class="flex justify-between items-start mb-2">
                      <h4 class="font-semibold text-lg text-neutral-700">成都锦里</h4>
                      <el-tag type="warning" size="small">计划中</el-tag>
                    </div>
                    <p class="text-neutral-500 mt-1">2023-11-10 至 2023-11-15 · 5晚6天</p>
                    <div class="flex justify-between items-center mt-4">
                      <span class="text-primary font-medium">¥3,860</span>
                      <el-button type="primary" size="small">准备出发</el-button>
                    </div>
                  </div>
                </el-card>
                
                <el-card class="card-hover p-0 overflow-hidden" shadow="hover">
                  <img src="https://picsum.photos/id/40/600/400" alt="西安古城" class="w-full h-48 object-cover">
                  <div class="p-5">
                    <div class="flex justify-between items-start mb-2">
                      <h4 class="font-semibold text-lg text-neutral-700">西安古城</h4>
                      <el-tag type="success" size="small">已完成</el-tag>
                    </div>
                    <p class="text-neutral-500 mt-1">2023-05-20 至 2023-05-25 · 5晚6天</p>
                    <div class="flex justify-between items-center mt-4">
                      <span class="text-primary font-medium">¥3,520</span>
                      <el-button type="text" size="small" class="text-primary">查看详情</el-button>
                    </div>
                  </div>
                </el-card>
              </div>
            </div>
          </el-card>
        </div>
      </div>
    </main>
    
    <!-- 页脚 -->
    <footer class="bg-neutral-700 text-white py-12 mt-12">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div class="flex items-center space-x-2 mb-4">
              <i class="fa fa-paper-plane text-primary text-2xl"></i>
              <span class="text-xl font-bold">旅行者</span>
            </div>
            <p class="text-neutral-300 text-sm mb-4">探索世界，发现美好，旅行者带你领略不一样的风景。</p>
            <div class="flex space-x-4">
              <a href="#" class="text-neutral-300 hover:text-white transition-colors">
                <i class="fa fa-weibo text-xl"></i>
              </a>
              <a href="#" class="text-neutral-300 hover:text-white transition-colors">
                <i class="fa fa-wechat text-xl"></i>
              </a>
              <a href="#" class="text-neutral-300 hover:text-white transition-colors">
                <i class="fa fa-instagram text-xl"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h4 class="text-lg font-semibold mb-4">热门目的地</h4>
            <ul class="space-y-2">
              <li><a href="#" class="text-neutral-300 hover:text-white transition-colors">北京</a></li>
              <li><a href="#" class="text-neutral-300 hover:text-white transition-colors">上海</a></li>
              <li><a href="#" class="text-neutral-300 hover:text-white transition-colors">广州</a></li>
              <li><a href="#" class="text-neutral-300 hover:text-white transition-colors">深圳</a></li>
              <li><a href="#" class="text-neutral-300 hover:text-white transition-colors">成都</a></li>
            </ul>
          </div>
          
          <div>
            <h4 class="text-lg font-semibold mb-4">热门推荐</h4>
            <ul class="space-y-2">
              <li><a href="#" class="text-neutral-300 hover:text-white transition-colors">主题旅游</a></li>
              <li><a href="#" class="text-neutral-300 hover:text-white transition-colors">自由行</a></li>
              <li><a href="#" class="text-neutral-300 hover:text-white transition-colors">跟团游</a></li>
              <li><a href="#" class="text-neutral-300 hover:text-white transition-colors">酒店预订</a></li>
              <li><a href="#" class="text-neutral-300 hover:text-white transition-colors">机票预订</a></li>
            </ul>
          </div>
          
          <div>
            <h4 class="text-lg font-semibold mb-4">联系我们</h4>
            <ul class="space-y-3">
              <li class="flex items-start">
                <i class="fa fa-map-marker text-primary mt-1 mr-3"></i>
                <span class="text-neutral-300">北京市朝阳区建国路88号</span>
              </li>
              <li class="flex items-center">
                <i class="fa fa-phone text-primary mr-3"></i>
                <span class="text-neutral-300">400-123-4567</span>
              </li>
              <li class="flex items-center">
                <i class="fa fa-envelope-o text-primary mr-3"></i>
                <span class="text-neutral-300">service@traveler.com</span>
              </li>
              <li class="flex items-center">
                <i class="fa fa-clock-o text-primary mr-3"></i>
                <span class="text-neutral-300">周一至周日 9:00-21:00</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div class="border-t border-neutral-600 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p class="text-neutral-400 text-sm">© 2023 旅行者 版权所有</p>
          <div class="flex space-x-4 mt-4 md:mt-0">
            <a href="#" class="text-neutral-400 hover:text-white text-sm transition-colors">隐私政策</a>
            <a href="#" class="text-neutral-400 hover:text-white text-sm transition-colors">服务条款</a>
            <a href="#" class="text-neutral-400 hover:text-white text-sm transition-colors">关于我们</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import api from '../services/api';

const userInfo = ref({
  email: 'traveler1@example.com',
  frequentCity: '北京',
  id: 1,
  nickname: '旅行者一号',
  preferences: ['历史', '文化', '美食', '摄影', '徒步', '自驾'],
  username: 'traveler1',
  memberLevel: '白金会员',
  registerTime: '2022-03-15',
  lastLoginTime: '2023-10-01 14:30',
  bio: '热爱旅行，喜欢分享旅途中的点点滴滴，希望通过自己的经历帮助更多人找到心仪的旅行目的地。',
  travelCount: 24,
  destinationCount: 16,
  followerCount: 256,
  phone: '138****6789',
  membershipExpire: '2024-12-31',
  birthday: '1990-01-01',
  gender: '男',
  occupation: '设计师',
  language: '中文、英文',
  wechat: 'traveler123'
});

const newPreference = ref('');

// 根据会员等级获取标签类型
const getMemberType = (level) => {
  switch(level) {
    case '普通会员': return 'info';
    case '青铜会员': return 'info';
    case '白银会员': return 'info';
    case '黄金会员': return 'warning';
    case '白金会员': return 'primary';
    case '钻石会员': return 'success';
    default: return 'info';
  }
};

// 添加兴趣偏好
const addPreference = () => {
  if (newPreference.value.trim()) {
    userInfo.value.preferences.push(newPreference.value.trim());
    newPreference.value = '';
    ElMessage.success('兴趣添加成功');
  }
};

// 移除兴趣偏好
const removePreference = (index) => {
  userInfo.value.preferences.splice(index, 1);
  ElMessage.success('兴趣已移除');
};

// 获取用户信息
onMounted(async () => {
  try {
    const response = await api.getUserInfo(1); // 硬编码用户ID为1
    if (response?.data) {
      userInfo.value = response.data;
    }
  } catch (error) {
    console.error('获取用户信息出错:', error);
    ElMessage.error('获取用户信息失败，请稍后再试');
  }
});
</script>

<style scoped>
@layer utilities {
  .content-auto {
    content-visibility: auto;
  }
  .card-hover {
    transition: all 0.3s ease;
  }
  .card-hover:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  }
}
</style>    