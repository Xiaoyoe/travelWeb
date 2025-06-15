import axios from 'axios'

const api = axios.create({
  baseURL: 'http://127.0.0.1:5000/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
})

// 请求拦截器
api.interceptors.request.use(
  config => {
    // 可以在这里添加token等
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
api.interceptors.response.use(
  response => {
    // 统一返回数据结构
    if (response.data?.data) {
      return response.data.data
    } else if (Array.isArray(response.data)) {
      return response.data
    } else {
      return response.data
    }
  },
  error => {
    return Promise.reject(error)
  }
)

export default {
  // 景点相关API
  getAttractions() {
    return api.get('/attractions')
  },
  getAttractionById(id) {
    return api.get(`/attractions/${id}`)
  },
  getAttractionByName(name) {
    return api.get(`/attractions/name/${name}`)
  },
  createAttraction(attractionData) {
    return api.post('/attractions', attractionData)
  },
  updateAttraction(id, attractionData) {
    return api.put(`/attractions/${id}`, attractionData)
  },
  deleteAttraction(id) {
    return api.delete(`/attractions/${id}`)
  },
  filterAttractions(category, region) {
    return api.get('/attractions/filter', { params: { category, region } })
  },
  
  // 分类相关API
  getCategories() {
    return api.get('/categories')
  },
  getCategoryAttractions(id) {
    return api.get(`/categories/${id}/attractions`)
  },
  
  // 地区相关API
  getRegions() {
    return api.get('/regions')
  },
  getRegionAttractions(id) {
    return api.get(`/regions/${id}/attractions`)
  },
  
  // 话题相关API
  getTopics() {
    return api.get('/topics')
  },
  getTopicById(id) {
    return api.get(`/topics/${id}`)
  },
  
  // 评论相关API
  getReviews() {
    return api.get('/reviews')
  },
  getReviewById(id) {
    return api.get(`/reviews/${id}`)
  },
  createReview(reviewData) {
    return api.post('/reviews', reviewData)
  },
  updateReview(id, reviewData) {
    return api.put(`/reviews/${id}`, reviewData)
  },
  deleteReview(id) {
    return api.delete(`/reviews/${id}`)
  },
  
  // 专题相关API
  getTopics() {
    return api.get('/topics')
  },
  getTopicById(id) {
    return api.get(`/topics/${id}`)
  },
  createTopic(topicData) {
    return api.post('/topics', topicData)
  },
  updateTopic(id, topicData) {
    return api.put(`/topics/${id}`, topicData)
  },
  deleteTopic(id) {
    return api.delete(`/topics/${id}`)
  },
  
  // 用户认证相关API
  register(userData) {
    return api.post('/auth/register', userData)
  },
  login(userData) {
    return api.post('/auth/login', userData)
  },
  
  // 用户信息相关API
  getUserInfo(id) {
    return api.get('/users/profile', {
      params: {
        user_id: id
      }
    })
  },
  updateUserInfo(id, userData) {
    return api.put(`/users/${id}`, userData)
  },
  getUserPreferences(id) {
    return api.get(`/users/${id}/preferences`)
  },
  updateUserPreferences(id, preferences) {
    return api.put(`/users/${id}/preferences`, preferences)
  }
}