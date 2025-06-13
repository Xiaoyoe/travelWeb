export default {
  namespaced: true,
  state: {
    attractions: [],
    currentAttraction: null,
    loading: false,
    error: null
  },
  mutations: {
    SET_ATTRACTIONS(state, attractions) {
      state.attractions = attractions;
    },
    SET_CURRENT_ATTRACTION(state, attraction) {
      state.currentAttraction = attraction;
    },
    SET_LOADING(state, loading) {
      state.loading = loading;
    },
    SET_ERROR(state, error) {
      state.error = error;
    }
  },
  actions: {
    async fetchAttractions({ commit }) {
      try {
        commit('SET_LOADING', true);
        const response = await api.getAttractions();
        commit('SET_ATTRACTIONS', response.data);
        commit('SET_ERROR', null);
      } catch (error) {
        commit('SET_ERROR', error.message);
      } finally {
        commit('SET_LOADING', false);
      }
    },
    async fetchAttractionById({ commit }, id) {
      try {
        commit('SET_LOADING', true);
        const response = await api.getAttractionById(id);
        commit('SET_CURRENT_ATTRACTION', response.data);
        commit('SET_ERROR', null);
      } catch (error) {
        commit('SET_ERROR', error.message);
      } finally {
        commit('SET_LOADING', false);
      }
    }
  },
  getters: {
    attractions: state => state.attractions,
    currentAttraction: state => state.currentAttraction,
    loading: state => state.loading,
    error: state => state.error
  }
}