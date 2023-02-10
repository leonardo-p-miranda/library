<template>
  <div>
    <search-bar @search-event="getPokemonData($event)"></search-bar>
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
    evolutions: {},
  }),
  created() {
    this.getPokemonData("ditto");
  },
  methods: {
    async getPokemonData(pokemonName) {
      this.pokemon = await this.getPokemons(pokemonName);
      this.evolutions = await this.getEvolutions(this.pokemon.id);
    },
    async getPokemons(pokemonName) {
      const { data } = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
      );
      console.log("🚀 ~ file: PokemonsView.vue:33 ~ getPokemons ~ data", data);
      return data;
    },
    async getEvolutions(pokemonId) {
      const { data } = await axios.get(
        `https://pokeapi.co/api/v2/evolution-chain/${pokemonId}/`
      );
      console.log(
        "🚀 ~ file: PokemonsView.vue:40 ~ getEvolutions ~ data",
        data
      );
      return data;
    },
  },
};
</script>

<style lang="scss" scoped></style>
