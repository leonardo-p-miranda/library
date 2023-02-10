<template>
  <v-card height="800" class="d-flex flex-column rounded-xl pa-4 justify-start">
    <v-card-title class="pb-4 d-flex justify-space-between align-center">
      <span class="text-h6 title text--primary mt-0 montserrat-alternates">
        {{ info.name }}
      </span>
      <div class="type-icons d-flex flex-row gap-10">
        <span class="text-h6 title text--primary mt-0 montserrat-alternates">
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
          'image-wrapper mb-6 rounded-xl d-flex justify-center ' +
          info.types[0].type.name
        "
      >
        <img class="pokemon-image" :src="image" alt="" height="250" />
      </div>
      <div class="stats mx-1">
        <div
          class="stats-line d-flex justify-space-between"
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
    </v-card-text>
  </v-card>
</template>

<script>
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
.image-wrapper {
  height: 150px;
  align-items: center;
}
</style>
