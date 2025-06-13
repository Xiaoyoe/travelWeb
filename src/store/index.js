import { createStore } from 'vuex';
import api from '@/services/api';

import user from './modules/user';
import attraction from './modules/attraction';
import review from './modules/review';
import favorite from './modules/favorite';
import topic from './modules/topic';

const store = createStore({
  modules: {
    user,
    attraction,
    review,
    favorite,
    topic
  },
  state: {
    loading: false,
    error: null
  },
  mutations: {
    SET_LOADING(state, loading) {
      state.loading = loading;
    },
    SET_ERROR(state, error) {
      state.error = error;
    }
  },
  getters: {
    loading: state => state.loading,
    error: state => state.error
  }
});

export default store;
