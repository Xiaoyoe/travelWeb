export default {
  namespaced: true,
  state: {
    topics: [],
    currentTopic: null,
    loading: false,
    error: null
  },
  mutations: {
    SET_TOPICS(state, topics) {
      state.topics = topics;
    },
    SET_CURRENT_TOPIC(state, topic) {
      state.currentTopic = topic;
    },
    SET_LOADING(state, loading) {
      state.loading = loading;
    },
    SET_ERROR(state, error) {
      state.error = error;
    }
  },
  actions: {
    async fetchTopics({ commit }) {
      try {
        commit('SET_LOADING', true);
        const response = await api.getTopics();
        commit('SET_TOPICS', response.data);
        commit('SET_ERROR', null);
      } catch (error) {
        commit('SET_ERROR', error.message);
      } finally {
        commit('SET_LOADING', false);
      }
    },
    async fetchTopicById({ commit }, id) {
      try {
        commit('SET_LOADING', true);
        const response = await api.getTopicById(id);
        commit('SET_CURRENT_TOPIC', response.data);
        commit('SET_ERROR', null);
      } catch (error) {
        commit('SET_ERROR', error.message);
      } finally {
        commit('SET_LOADING', false);
      }
    }
  },
  getters: {
    topics: state => state.topics,
    currentTopic: state => state.currentTopic,
    loading: state => state.loading,
    error: state => state.error
  }
}