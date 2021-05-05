import { mapState, mapMutations } from "vuex";

const myPlugins = {
  install(Vue) {
    Vue.mixin({
      data: () => ({}),
      computed: {
        ...mapState(["isDarkTheme", "todoItems"]),
      },
      methods: {
        ...mapMutations([
          "CHANGE_THEME",
          "ADD_TODO_ITEMS",
          "REMOVE_TODO_ITEMS",
          "TOGGLE_TODO_ITEMS",
          "TRUNCATE_TODO_ITEMS"
        ]),
      },
    });
  },
};

export default myPlugins;
