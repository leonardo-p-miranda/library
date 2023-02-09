import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/pokemon/:id",
    name: "pokemon",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/PokemonDetailsView.vue"),
  },
  {
    path: "/pokemons",
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
