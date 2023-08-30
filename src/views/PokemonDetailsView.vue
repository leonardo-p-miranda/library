<template>
  <v-container class="book-details-view" id="container">
    <v-row v-if="!loading" class="mt-6 pl-4 header d-flex align-center">
      <v-btn
        class="rounded-xl mr-4"
        elevation="3"
        style="position: fixed; z-index: 5000"
        size="35"
        :to="'/'"
      >
        <svg-icon size="26" type="mdi" :path="path"></svg-icon>
      </v-btn>
      <v-col cols="12" class="d-flex align-center justify-center">
        <router-link to="/">
          <img to="/" height="40" :src="require('../assets/logo.png')" alt="" />
        </router-link>
      </v-col>
    </v-row>
    <v-row v-if="!loading">
      <v-row>
        <v-col xs="12" sm="12" md="4" lg="4" xl="3">
          <book-details-card :book="book"></book-details-card>
        </v-col>
        <v-col cols="12" sm="12" md="8" lg="8" xl="9" class="my-16">
          <v-row>
            <book-details-section
              @update-event="getPokemonData()"
              :info="allPokemonInfos"
            ></book-details-section>
          </v-row>
        </v-col>
      </v-row>
    </v-row>
    <v-row v-else>
      <v-col cols="12" class="d-flex w100 h90vh justify-center align-center">
        <img
          height="100"
          class="loader-animation"
          :src="require('../assets/logo.png')"
          alt=""
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiChevronLeft } from "@mdi/js";
import { usePokemonStore } from "@/store/usePokemonStore";
import { mapWritableState } from "pinia";
import BookDetailsCard from "../components/BookDetailsCard.vue";
import BookDetailsSection from "../components/BookDetailsSection.vue";

export default {
  components: {
    BookDetailsCard,
    BookDetailsSection,
    SvgIcon,
  },
  data: () => ({
    path: mdiChevronLeft,
    book: {},
    usePokemon: usePokemonStore(),
    loading: true,
  }),
  computed: {
    ...mapWritableState(usePokemonStore, ["currentPokemon", "allPokemonInfos"]),
  },
  async mounted() {
    await this.getPokemonData();
  },
  methods: {
    async getPokemonData() {
      const { id } = this.$route.params;
      const fixedName = id.replace(" ", "-");
      this.loading = true;
      if (id !== this.currentPokemon.name) {
        await this.usePokemon.getPokemon(fixedName);
      } else {
        this.book = this.currentPokemon;
      }
      await this.usePokemon.getEvolutionChain(fixedName);
      await this.usePokemon.getRegionInfo();
      this.book = this.currentPokemon;
      this.loading = false;
    },
  },
};
</script>
