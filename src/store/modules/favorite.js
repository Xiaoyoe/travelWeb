export default {
  namespaced: true,
  state: {
    favorites: [],
    loading: false,
    error: null
  },
  mutations: {
    SET_FAVORITES(state, favorites) {
      state.favorites = favorites;
    },
    SET_LOADING(state, loading) {
      state.loading = loading;
    },
    SET_ERROR(state, error) {
      state.error = error;
    }
  },
  actions: {
    async fetchFavorites({ commit }) {
      try {
        commit('SET_LOADING', true);
        const response = await api.getFavorites();
        commit('SET_FAVORITES', response.data);
        commit('SET_ERROR', null);
      } catch (error) {
        commit('SET_ERROR', error.message);
      } finally {
        commit('SET_LOADING', false);
      }
    },
    async addFavorite({ commit }, favoriteData) {
      try {
        commit('SET_LOADING', true);
        const response = await api.addFavorite(favoriteData);
        commit('SET_ERROR', null);
        return response.data;
      } catch (error) {
        commit('SET_ERROR', error.message);
        throw error;
      } finally {
        commit('SET_LOADING', false);
      }
    },
    async removeFavorite({ commit }, id) {
      try {
        commit('SET_LOADING', true);
        await api.removeFavorite(id);
        commit('SET_ERROR', null);
      } catch (error) {
        commit('SET_ERROR', error.message);
        throw error;
      } finally {
        commit('SET_LOADING', false);
      }
    }
  },
  getters: {
    favorites: state => state.favorites,
    loading: state => state.loading,
    error: state => state.error
  }
}