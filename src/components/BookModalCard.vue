<template>
  <v-card
    :color="darkMode ? '#18181f' : '#fff'"
    height="900"
    :class="[
      'book-modal-card d-flex flex-column rounded-xl pa-4 justify-start ',
      darkMode ? ' dark-mode' : '',
    ]"
  >
    <v-card-title class="pb-4 d-flex justify-space-between align-center">
      <span class="text-h6 title mt-0 montserrat-alternates">
        {{ info.name }}
      </span>
      <div class="type-icons d-flex flex-row gap-10">
        <span class="text-h6 title mt-0 montserrat-alternates">
          <span
            class="text-caption montserrat-alternates"
            style="font-size: 10px"
            >XP</span
          >{{ info.base_experience }}
        </span>
        <div
          class="type-icon mt-1"
          v-for="(pokeType, index) in info.types"
          :key="index"
        >
          <img height="20" :src="getIcon(pokeType.type.name)" alt="" />
        </div>
      </div>
    </v-card-title>
    <v-card-text>
      <div
        :class="
          'image-wrapper mb-6 mt-3 rounded-xl d-flex justify-center ' +
          info.types[0].type.name
        "
      >
        <img
          class="book-image"
          :src="require('../assets/book.png')"
          alt=""
          height="220"
        />
      </div>
      <div class="stats mx-1">
        <div
          class="stats-line d-flex justify-space-between mt-1"
          v-for="stat in info.stats"
          :key="stat.name"
        >
          <span class="title">
            {{ formatTitle(stat.stat.name) }}
          </span>
          <span class="montserrat-alternates">
            {{ stat.base_stat }}
          </span>
        </div>
      </div>
      <div class="w100 d-flex justify-center mt-6">
        <v-btn
          class="rounded-lg"
          depressed
          :to="link"
          width="250"
          :color="darkMode ? 'black' : '#F5F5F5'"
        >
          <span class="montserrat-alternates title">See all details</span>
          <svg-icon class="ml-3" size="16" type="mdi" :path="path"></svg-icon>
        </v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiArrowExpandAll } from "@mdi/js";
import { usePokemonStore } from "@/store/usePokemonStore";
import { mapWritableState } from "pinia";

export default {
  props: {
    info: {
      type: Object,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  components: {
    SvgIcon,
  },
  data: () => ({
    path: mdiArrowExpandAll,
  }),
  methods: {
    getIcon(icon) {
      return require(`@/assets/icons/${icon}.svg`);
    },
    formatTitle(title) {
      return title.replace("-", " ");
    },
  },
  computed: {
    link() {
      return `/book/${this.info.name}`;
    },
    ...mapWritableState(usePokemonStore, ["darkMode"]),
  },
};
</script>

<style lang="scss" scoped>
.book-modal-card {
  .image-wrapper {
    height: 150px;
    align-items: center;
    justify-content: center;
  }
}
</style>
