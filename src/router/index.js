import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/book/:id",
    name: "book",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/PokemonDetailsView.vue"),
  },
  {
    path: "/",
    name: "books",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/PokemonsView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
