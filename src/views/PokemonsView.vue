<template>
  <div>
    <v-container
      class="d-flex justify-center align-center"
      style="height: 100vh"
      v-if="loading"
    >
      <v-progress-circular
        size="100"
        indeterminate
        color="primary"
        class=""
      ></v-progress-circular
    ></v-container>
    <v-container class="mb-5" v-else>
      <v-row class="mb-4">
        <v-col cols="12">
          <search-bar @search-event="getPokemonData($event)"></search-bar>
        </v-col>
      </v-row>
      <transition>
        <v-row v-if="Object.keys(pokemon).length">
          <v-col xs="12" sm="12" md="12">
            <div class="column-title">
              <span class="text-subtitle-1 montserrat-alternates">
                My Pokemon
              </span>
            </div>
            <pokemon-card
              class="d-flex justify-center align-center"
              :info="pokemon"
              :image="pokemon.sprites.front_default"
            />
          </v-col>
          <v-col
            v-for="(evolution, index) in evolutions"
            xs="13"
            sm="4"
            md="3"
            :key="index"
          >
            <div class="column-title">
              <span
                v-if="index == 0"
                class="text-subtitle-1 montserrat-alternates"
              >
                Evolutions
              </span>
            </div>
            <pokemon-card
              v-if="evolutions.length"
              class="d-flex justify-center align-center"
              :disabled="pokemon == evolution"
              :info="evolution"
              :image="evolution.sprites.front_default"
            />
          </v-col>
        </v-row>
      </transition>
    </v-container>
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
    loading: false,
    pokemon: {},
    evolutionChain: {},
    evolutions: [],
    relatives: [1, 2, 2, 2],
    dialog: true,
    selected: 1,
  }),
  computed: {
    images() {
      return {
        front: this.pokemon.sprites.front_default,
        back: this.pokemon.sprites.back_default,
      };
    },
  },
  methods: {
    async getPokemonData(pokemonName) {
      this.pokemon = await this.getPokemons(pokemonName.replace(" ", "-"));
      if (this.pokemon) {
        this.evolutions = await this.getEvolutionChain(pokemonName);
      } else {
        this.evolutions = [];
      }
    },
    async getPokemons(pokemonName) {
      try {
        const { data } = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
        );
        return data;
      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.error(`Pokemon "${pokemonName}" not found.`);
          return {};
        } else {
          throw error;
        }
      }
    },
    async getEvolutionChain(pokemonName) {
      const evolutionChainUrl = this.pokemon?.species.url;

      const evolutionResponse = await axios.get(evolutionChainUrl);
      const evolutionData = evolutionResponse.data;
      const evolutionChain = evolutionData.evolution_chain.url;

      const finalResponse = await axios.get(evolutionChain);
      const finalData = finalResponse.data;

      const evolutionDetails = finalData.chain;
      let evolutions = [];

      const getEvolutions = async (currentPokemon) => {
        const pokemonResponse = await axios.get(currentPokemon.species.url);
        const pokemonData = pokemonResponse.data;
        if (pokemonData.name !== pokemonName) {
          const pokemon = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${pokemonData.name}`
          );
          evolutions.push(pokemon.data);
        } else {
          evolutions.push(this.pokemon);
        }

        for (const evolvesTo of currentPokemon.evolves_to) {
          await getEvolutions(evolvesTo);
        }
      };

      await getEvolutions(evolutionDetails);

      return evolutions;
    },
  },
};
</script>
<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
}
.column-title {
  height: 40px;
}
</style>
