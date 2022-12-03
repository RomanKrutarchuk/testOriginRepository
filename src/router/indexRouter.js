import { createRouter, createWebHistory } from "vue-router";
import Chat from "@/Chat.vue";
import Home from "@/HomeComponent.vue"
const routes = [
  { path: "/chat", component: Chat },
  { path: "/home", component: Home },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
