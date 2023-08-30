<template>
  <div class="books-view">
    <v-container class="mb-5">
      <v-row class="mb-4">
        <v-col cols="12" :class="noPokemons && start ? 'centered-bar' : ''">
          <search-bar @search-event="getPokemonData($event)"></search-bar>
        </v-col>
      </v-row>
      <transition>
        <v-row v-if="!noPokemons">
          <v-col cols="12" sm="12" md="6" lg="3">
            <div class="column-title">
              <span class="text-subtitle-1 montserrat-alternates">
                Our book
              </span>
            </div>
            <book-card
              :elevated="true"
              :loading="loadingPokemon"
              :info="currentPokemon"
              :image="currentPokemon.sprites.front_default"
            />
          </v-col>
          <v-col
            v-for="(evolution, index) in evolutions"
            cols="12"
            sm="12"
            md="6"
            lg="3"
            :key="index"
          >
            <div class="column-title">
              <span
                v-if="index == 0"
                class="text-subtitle-1 montserrat-alternates"
              >
                Related Books
              </span>
            </div>
            <book-card
              v-if="evolutions.length"
              :disabled="evolution.selected"
              :info="evolution"
              :image="evolution.sprites.front_default"
              :loading="loadingEvolutions"
            />
          </v-col>
        </v-row>
        <v-row v-else-if="loadingEvolutions || loadingPokemon">
          <v-col cols="12" class="d-flex w100 justify-center align-center mt-4">
            <img
              height="60"
              class="loader-animation"
              :src="require('../assets/logo.png')"
              alt=""
            />
          </v-col>
        </v-row>
        <transition
          v-else-if="!start && !(loadingEvolutions && loadingPokemon)"
        >
          <v-row>
            <v-col cols="12">
              <span class="mx-2">{{
                `Pokemon ${searchName} not found. Are you sure you typed it correctly?`
              }}</span>
            </v-col>
          </v-row>
        </transition>
      </transition>
    </v-container>
  </div>
</template>

<script>
import SearchBar from "../components/BooksSearchBar.vue";
import BookCard from "../components/BookCard.vue";
import { usePokemonStore } from "@/store/usePokemonStore";
import { mapWritableState } from "pinia";

export default {
  name: "App",
  components: { SearchBar, BookCard },

  data: () => ({
    usePokemon: usePokemonStore(),
    loading: false,
    loadingEvolutions: false,
    loadingPokemon: false,
    book: {},
    searchName: "",
    dialog: true,
    selected: 1,
    start: true,
  }),
  async created() {
    this.start = true;
  },
  computed: {
    ...mapWritableState(usePokemonStore, ["currentPokemon", "evolutions"]),
    images() {
      return {
        front: this.book.sprites.front_default,
        back: this.book.sprites.back_default,
      };
    },
    noPokemons() {
      return !Object.keys(this.currentPokemon).length;
    },
  },
  methods: {
    async getPokemonData(pokemonName) {
      if (pokemonName == this.currentPokemon.name) return;
      this.start = false;
      this.searchName = pokemonName;
      const fixedName = pokemonName.trim().replace(" ", "-");
      this.loadingPokemon = true;
      this.loadingEvolutions = true;
      try {
        await this.usePokemon.getPokemon(fixedName);
      } catch (error) {
        this.loadingPokemon = false;
        this.loadingEvolutions = false;
        return;
      }
      this.loadingPokemon = false;
      await this.usePokemon.getEvolutionChain(fixedName);
      this.loadingEvolutions = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.books-view {
  .v-enter-active,
  .v-leave-active {
    transition: opacity 0.3s;
  }
  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }
  .column-title {
    height: 40px;
    margin: 0 5px;
  }
  .centered-bar {
    height: 90vh;
    display: flex;
    align-items: center;
  }
}
</style>
