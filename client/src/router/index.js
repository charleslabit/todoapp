import Vue from "vue";
import VueRouter from "vue-router";
import ToDo from "../views/ToDo.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Todo",
    component: ToDo,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
