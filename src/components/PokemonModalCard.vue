<template>
  <v-card
    height="900"
    class="pokemon-modal-card d-flex flex-column rounded-xl pa-4 justify-start"
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
        <img class="pokemon-image" :src="image" alt="" height="220" />
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
          :to="`/pokemon/${info.name}`"
          width="250"
          color="#F5F5F5"
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
      return require(`@/assets/${icon}.svg`);
    },
    formatTitle(title) {
      return title.replace("-", " ");
    },
  },
};
</script>

<style lang="scss" scoped>
.pokemon-modal-card {
  .image-wrapper {
    height: 150px;
    align-items: center;
    justify-content: center;
  }
}
</style>
