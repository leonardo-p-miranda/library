<template>
  <div>
    <search-bar></search-bar>
    <pokemon-card
      v-for="(pokemon, index) in pokemons"
      :key="index"
      :name="pokemon.name"
    />
  </div>
</template>

<script>
import axios from "axios";
import SearchBar from "../components/SearchBar.vue";
import PokemonCard from "../components/PokemonCard.vue";

export default {
  name: "App",
  components: { SearchBar, PokemonCard },

  data: () => ({
    pokemons: [{ name: "leozinho" }, { name: "Cleifada" }],
  }),
  created() {
    this.getPokemons();
  },
  methods: {
    async getPokemons() {
      const { data } = await axios.get("https://pokeapi.co/api/v2/pokemon");
      console.log("🚀 ~ file: PokemonsView.vue:26 ~ getPokemons ~ data", data);
    },
  },
};
</script>

<style lang="scss" scoped></style>
