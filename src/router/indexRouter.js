import { createRouter, createWebHistory } from "vue-router";
import Main from "@/App.vue";
const routes = [{ path: "/", component: Main }];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;