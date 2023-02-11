<template>
  <p class="text-h6 montserrat-alternates mx-5">Sprites</p>
  <div
    class="text-subtitle-1 d-flex justify-space-between w100 mx-5 d-flex flex-wrap"
  >
    <img
      v-for="spriteUrl in getSprites"
      :key="spriteUrl"
      class="pokemon-image"
      :src="spriteUrl"
      alt=""
      height="130"
    />
  </div>
  <v-divider class="mx-4 mt-2 mb-4"></v-divider>
  <p class="text-h6 montserrat-alternates mx-5">Regions</p>
  <div v-if="!info.regionInfo.length">
    <p class="title">No areas found</p>
  </div>
  <div
    v-else
    v-for="(region, index) in info.regionInfo"
    :key="index"
    class="text-subtitle-1 d-flex justify-space-between w100 mx-5"
  >
    <span class="title"> {{ normalizeString(region.location_area.name) }}</span>
  </div>
  <v-divider class="mx-4 mt-2 mb-4"></v-divider>
  <p class="text-h6 montserrat-alternates mx-5 mb-2">Forms</p>
  <div
    v-for="(form, index) in info.currentPokemon.forms"
    :key="index"
    class="text-subtitle-1 d-flex justify-space-between w100 mx-5"
  >
    <span class="title"> {{ normalizeString(form.name) }}</span>
  </div>
  <v-divider class="mx-4 mt-2 mb-4"></v-divider>
</template>

<script>
export default {
  props: {
    info: {
      type: Object,
    },
  },
  methods: {
    normalizeString(string) {
      return string.replace("-", " ");
    },
  },
  computed: {
    getSprites() {
      const spritesArray = Object.values(this.info.currentPokemon.sprites);
      return spritesArray;
    },
  },
};
</script>

<style lang="scss" scoped></style>
