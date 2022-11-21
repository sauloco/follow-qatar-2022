import { createRouter, createWebHistory } from "vue-router";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Today",
      component: () => import('../views/Today.vue'),
      props: true,
    },
    {
      path: "/grupo/:name",
      name: "Group",
      component: () => import('../views/Group.vue'),
      props: true,
    },
    {
      path: "/octavos",
      name: "Round16",
      component: () => import('../views/Round16.vue'),
    },
    {
      path: "/cuartos",
      name: "Round8",
      component: () => import('../views/Round8.vue'),
    },
    {
      path: "/semifinales",
      name: "Semifinals",
      component: () => import('../views/Semifinals.vue'),
    },
    {
      path: "/finales",
      name: "Finals",
      component: () => import('../views/Finals.vue'),
    },
  ],
});

export default router;
