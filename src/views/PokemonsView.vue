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
        <v-row v-if="Object.keys(currentPokemon).length">
          <v-col xs="12" sm="12" md="3">
            <div class="column-title">
              <span class="text-subtitle-1 montserrat-alternates">
                My Pokemon
              </span>
            </div>
            <pokemon-card
              :info="currentPokemon"
              :image="currentPokemon.sprites.front_default"
            />
          </v-col>
          <v-col
            v-for="(evolution, index) in evolutions"
            xs="12"
            sm="4"
            md="3"
            :key="index"
          >
            <div class="column-title">
              <span
                v-if="index == 0"
                class="text-subtitle-1 montserrat-alternates"
              >
                Evolution chain
              </span>
            </div>
            <pokemon-card
              v-if="evolutions.length"
              :disabled="pokemon == evolution"
              :info="evolution"
              :image="evolution.sprites.front_default"
            />
          </v-col>
        </v-row>
        <transition v-else-if="!start">
          <v-row>
            <v-col cols="12">
              <span
                >Pokemon not found. Are you sure you typed it correctly?</span
              >
            </v-col>
          </v-row>
        </transition>
      </transition>
    </v-container>
  </div>
</template>

<script>
import SearchBar from "../components/PokemonSearchBar.vue";
import PokemonCard from "../components/PokemonCard.vue";
import { usePokemonStore } from "@/store/usePokemonStore";
import { mapWritableState } from "pinia";

export default {
  name: "App",
  components: { SearchBar, PokemonCard },

  data: () => ({
    usePokemon: usePokemonStore(),
    loading: false,
    pokemon: {},
    dialog: true,
    selected: 1,
    start: true,
  }),
  async created() {
    this.start = true;
  },
  computed: {
    images() {
      return {
        front: this.pokemon.sprites.front_default,
        back: this.pokemon.sprites.back_default,
      };
    },
    ...mapWritableState(usePokemonStore, ["currentPokemon"]),
    ...mapWritableState(usePokemonStore, ["evolutions"]),
  },
  methods: {
    async getPokemonData(pokemonName) {
      this.start = false;
      const fixedName = pokemonName.replace(" ", "-");
      await this.usePokemon.getPokemon(fixedName);
      await this.usePokemon.getEvolutionChain(fixedName);
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
  margin: 0 5px;
}
</style>
