<template>
  <v-card
    height="800"
    class="d-flex flex-column rounded-xl justify-center pa-4"
  >
    <v-card-text class="pb-0 d-flex justify-pace-between">
      {{ info.name }}
      <span
        class="text-subtitle-1 mt-1 title text--primary mt-0 montserrat-alternates"
      >
        {{ info.name }}
      </span>
      <span class="text-h6 title text--primary mt-0 montserrat-alternates">
        <span
          class="text-caption montserrat-alternates"
          style="font-size: 10px"
        >
          XP
        </span>
        {{ info.name }}
      </span>
    </v-card-text>
    <v-card-text class="pt-0 card-text">
      <div class="d-flex justify-end" style="gap: 3px">
        <div
          class="type-icon"
          v-for="(pokeType, index) in info.types"
          :key="index"
        >
          <img height="20" :src="getIcon(pokeType.type.name)" alt="" />
        </div>
      </div>
      <div
        :class="
          'image-wrapper rounded-xl d-flex justify-center ' +
          info.types[0].type.name
        "
      >
        <img :src="image" alt="" class="pokemon-image" height="250" />
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
      return required(`@/assets/${icon}.svg`);
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
