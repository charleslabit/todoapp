import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isDarkTheme: false,
    todoItems: [],
  },
  mutations: {
    CHANGE_THEME: (state, data) => {
      state.isDarkTheme = !data;
    },
    ADD_TODO_ITEMS: (state, data) => {
      state.todoItems.push(data);
    },
    REMOVE_TODO_ITEMS: (state, data) => {
      state.todoItems.splice(data, 1);
    },
    TOGGLE_TODO_ITEMS: (state, data) => {
      state.todoItems[data].done = !state.todoItems[data].done;
    },
    TRUNCATE_TODO_ITEMS: (state) => {
      state.todoItems = []
    },
  },
  actions: {},
  modules: {},
  plugins: [createPersistedState()],
});
