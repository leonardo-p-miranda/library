<template>
  <div class="pokemons-view">
    <v-container
      class="d-flex justify-center align-center"
      style="height: 100vh"
      v-if="loading"
    >
      <v-progress-circular
        size="100"
        indeterminate
        color="primary"
      ></v-progress-circular
    ></v-container>
    <v-container class="mb-5" v-else>
      <v-switch :label="table ? 'Tabela' : 'Padrão'" v-model="table" />
      <transition v-if="table">
        <v-row>
          <search-bar @search-event="getPokemonData($event)"></search-bar>
          <v-col cols="12">
            <div class="column-title">
              <span class="text-subtitle-1 montserrat-alternates">
                Dashboard
              </span>
            </div>
            <admin-table :all-books="allPokemons" />
          </v-col>
        </v-row>
      </transition>
    </v-container>
  </div>
</template>

<script>
import { usePokemonStore } from "@/store/usePokemonStore";
import { mapWritableState } from "pinia";
import AdminTable from "../components/AdminTable.vue";
import SearchBar from "../components/BooksSearchBar.vue";

export default {
  name: "App",
  components: { AdminTable, SearchBar },

  data: () => ({
    usePokemon: usePokemonStore(),
    loading: false,
    table: false,
  }),
  async created() {
    this.getAllPokemons();
  },
  computed: {
    ...mapWritableState(usePokemonStore, ["allPokemons"]),
  },
  methods: {
    async getAllPokemons() {
      this.loading = true;
      await this.usePokemon.getAllPokemons();
      this.loading = false;
    },
    async getPokemonData(pokemonName) {
      if (pokemonName == this.currentPokemon.name) return;
      this.start = false;
      this.searchName = pokemonName;
      const fixedName = pokemonName.replace(" ", "-");
      this.loadingPokemon = true;
      this.loadingEvolutions = true;
      await this.usePokemon.getPokemon(fixedName);
      this.loadingPokemon = false;
      await this.usePokemon.getEvolutionChain(fixedName);
      this.loadingEvolutions = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.pokemons-view {
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
}
</style>
