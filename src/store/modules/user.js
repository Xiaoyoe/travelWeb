import api from '@/services/api';

export default {
  namespaced: true,
  state: {
    user: null,
    loading: false,
    error: null
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    CLEAR_USER(state) {
      state.user = null;
    },
    SET_LOADING(state, loading) {
      state.loading = loading;
    },
    SET_ERROR(state, error) {
      state.error = error;
    }
  },
  actions: {
    async login({ commit }, userData) {
      try {
        commit('SET_LOADING', true);
        const response = await api.login(userData);
        // 检查返回数据中是否包含用户信息
        if (!response?.data) {
          throw new Error('登录成功但未获取到有效数据');
        }
        
        // 确保用户数据存在，可能在data对象中直接包含用户字段
        const userInfo = response.data.id ? response.data : response.data.user;
        if (!userInfo) {
          throw new Error('登录成功但未获取到用户数据');
        }
        
        commit('SET_USER', userInfo);
        commit('SET_ERROR', null);
        return {
          ...response.data,
          user: userInfo
        };
      } catch (error) {
        commit('SET_ERROR', error.message);
        throw error;
      } finally {
        commit('SET_LOADING', false);
      }
    },
    async register({ commit }, userData) {
      try {
        commit('SET_LOADING', true);
        const response = await api.register(userData);
        commit('SET_USER', response.data.user);
        commit('SET_ERROR', null);
        return response.data;
      } catch (error) {
        commit('SET_ERROR', error.message);
        throw error;
      } finally {
        commit('SET_LOADING', false);
      }
    },
    async logout({ commit }) {
      commit('CLEAR_USER');
    },
    async fetchUserInfo({ commit }, id) {
      try {
        commit('SET_LOADING', true);
        const response = await api.getUserInfo(id);
        commit('SET_USER', response.data);
        commit('SET_ERROR', null);
      } catch (error) {
        commit('SET_ERROR', error.message);
      } finally {
        commit('SET_LOADING', false);
      }
    }
  },
  getters: {
    user: state => state.user,
    loading: state => state.loading,
    error: state => state.error
  }
}