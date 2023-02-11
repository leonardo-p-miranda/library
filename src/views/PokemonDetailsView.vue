<template>
  <v-container class="pokemon-details-view">
    <v-row class="mt-6 header d-flex align-center">
      <v-btn class="rounded-xl mr-4" size="25" :to="'/'">
        <svg-icon size="26" type="mdi" :path="path"></svg-icon>
      </v-btn>
      <img height="40" :src="require('../assets/logo.png')" alt="" />
    </v-row>
    <v-row v-if="!loading">
      <v-row>
        <v-col xs="12" sm="12" md="4" lg="4" xl="3">
          <pokemon-details-card :pokemon="pokemon"></pokemon-details-card>
        </v-col>
        <v-col cols="12" sm="12" md="8" lg="8" xl="9" class="my-16">
          <v-row>
            <pokemon-details-section
              :info="allPokemonInfos"
            ></pokemon-details-section>
          </v-row>
        </v-col>
      </v-row>
    </v-row>
    <v-row v-else>
      <v-col cols="12" class="d-flex w100 h100vh justify-center align-center">
        <v-progress-circular
          size="100"
          indeterminate
          color="primary"
          class=""
        ></v-progress-circular>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiChevronLeft } from "@mdi/js";
import { usePokemonStore } from "@/store/usePokemonStore";
import { mapWritableState } from "pinia";
import PokemonDetailsCard from "../components/PokemonDetailsCard.vue";
import PokemonDetailsSection from "../components/PokemonDetailsSection.vue";

export default {
  components: {
    PokemonDetailsCard,
    PokemonDetailsSection,
    SvgIcon,
  },
  data: () => ({
    path: mdiChevronLeft,
    pokemon: {},
    usePokemon: usePokemonStore(),
    loading: true,
  }),
  computed: {
    ...mapWritableState(usePokemonStore, ["currentPokemon", "allPokemonInfos"]),
  },
  async mounted() {
    this.loading = true;
    await this.getPokemonData();
    this.loading = false;
  },
  methods: {
    async getPokemonData() {
      const { id } = this.$route.params;
      if (id == this.currentPokemon.name) {
        this.pokemon = this.currentPokemon;
        return;
      }
      const fixedName = id.replace(" ", "-");
      await this.usePokemon.getPokemon(fixedName);
      await this.usePokemon.getEvolutionChain(fixedName);
      await this.usePokemon.getRegionInfo();
      this.pokemon = this.currentPokemon;
    },
  },
};
</script>
