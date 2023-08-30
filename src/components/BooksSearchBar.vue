<template>
  <v-container class="search-bar-container">
    <v-switch
      :label="darkMode ? 'Light' : 'Dark'"
      @change="toggleTheme()"
      hide-details
    ></v-switch>
    <v-row>
      <v-col cols="12" class="d-flex justify-center">
        <router-link to="/" @click="$router.go()">
          <img height="40" :src="require('../assets/logo.png')" alt="" />
        </router-link>
      </v-col>
    </v-row>
    <v-row>
      <v-text-field
        class="text-field roundex-xl"
        label="Search for Pokemon"
        filled
        rounded
        dense
        hint="For example, Charmander..."
        v-model="search"
        @keydown.enter="emitSearch()"
      ></v-text-field>
    </v-row>
  </v-container>
</template>

<script>
import { usePokemonStore } from "@/store/usePokemonStore";
import { mapWritableState } from "pinia";

export default {
  data: () => ({
    search: "",
  }),
  methods: {
    emitSearch() {
      this.$emit("search-event", this.search.toLowerCase());
    },
    toggleTheme() {
      this.darkMode = !this.darkMode;
    },
  },
  computed: {
    ...mapWritableState(usePokemonStore, ["darkMode"]),
  },
};
</script>

<style lang="scss" scoped>
.search-bar-container {
  & .v-row > .text-field {
    width: 500px;
    margin-right: 50px;
  }
}
</style>
