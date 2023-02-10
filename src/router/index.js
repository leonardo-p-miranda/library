import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/pokemon/:id",
    name: "pokemon",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/PokemonDetailsView.vue"),
  },
  {
    path: "/",
    name: "pokemons",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/PokemonsView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
