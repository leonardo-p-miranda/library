<template>
  <div>
    <search-bar></search-bar>
    <pokemon-card :name="pokemon.name" :image="pokemon.sprites.front_default" />
  </div>
</template>

<script>
import axios from "axios";
import SearchBar from "../components/PokemonSearchBar.vue";
import PokemonCard from "../components/PokemonCard.vue";

export default {
  name: "App",
  components: { SearchBar, PokemonCard },

  data: () => ({
    pokemon: {},
  }),
  created() {
    this.getPokemons();
  },
  methods: {
    async getPokemons() {
      const { data } = await axios.get(
        "https://pokeapi.co/api/v2/pokemon/ditto"
      );
      this.pokemon = await data;
      console.log(
        "🚀 ~ file: PokemonsView.vue:31 ~ getPokemons ~ this.pokemons",
        this.pokemon.sprites
      );
      console.log("🚀 ~ file: PokemonsView.vue:26 ~ getPokemons ~ data", data);
    },
  },
};
</script>

<style lang="scss" scoped></style>
