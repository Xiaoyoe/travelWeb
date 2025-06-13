export default {
  namespaced: true,
  state: {
    reviews: [],
    loading: false,
    error: null
  },
  mutations: {
    SET_REVIEWS(state, reviews) {
      state.reviews = reviews;
    },
    SET_LOADING(state, loading) {
      state.loading = loading;
    },
    SET_ERROR(state, error) {
      state.error = error;
    }
  },
  actions: {
    async fetchReviews({ commit }) {
      try {
        commit('SET_LOADING', true);
        const response = await api.getReviews();
        commit('SET_REVIEWS', response.data);
        commit('SET_ERROR', null);
      } catch (error) {
        commit('SET_ERROR', error.message);
      } finally {
        commit('SET_LOADING', false);
      }
    },
    async addReview({ commit }, reviewData) {
      try {
        commit('SET_LOADING', true);
        const response = await api.createReview(reviewData);
        commit('SET_ERROR', null);
        return response.data;
      } catch (error) {
        commit('SET_ERROR', error.message);
        throw error;
      } finally {
        commit('SET_LOADING', false);
      }
    }
  },
  getters: {
    reviews: state => state.reviews,
    loading: state => state.loading,
    error: state => state.error
  }
}