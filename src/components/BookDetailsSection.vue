<template>
  <p class="text-h6 montserrat-alternates mx-5">Regions</p>
  <div
    v-if="!info.regionInfo.length"
    class="text-subtitle-1 d-flex justify-space-between w100 mx-5"
  >
    <span class="title">No areas found</span>
  </div>
  <div
    v-for="(region, index) in normalizedLocations"
    :key="index"
    class="text-subtitle-1 d-flex justify-space-between w100 mx-5"
  >
    <span class="title"> {{ region }}</span>
  </div>
  <v-divider class="mx-4 mt-2 mb-4"></v-divider>
  <p class="text-h6 montserrat-alternates mx-5 mb-2">Forms</p>
  <div
    v-for="(form, index) in normalizedForms"
    :key="index"
    class="text-subtitle-1 d-flex justify-space-between w100 mx-5"
  >
    <span class="title"> {{ form }}</span>
  </div>
  <v-divider class="mx-4 mt-2 mb-4"></v-divider>
  <p class="text-h6 montserrat-alternates mx-5 mb-2">Types</p>
  <div
    class="text-subtitle-1 d-flex justify-start gap-25 w100 mx-5 d-flex flex-wrap"
    v-for="(type, index) in info.currentPokemon.types"
    :key="index"
  >
    <span class="title"> {{ type.type.name }}</span>
  </div>
  <v-divider class="mx-4 mt-2 mb-4"></v-divider>
  <p class="text-h6 montserrat-alternates mx-5 mb-2">Evolution chain</p>
  <div
    class="text-subtitle-1 d-flex justify-start gap-25 w100 mx-5 d-flex flex-wrap"
    v-for="(evolution, index) in info.evolutionInfo"
    :key="index"
  >
    <span class="title"> {{ evolution.name }}</span>
  </div>
  <v-divider class="mx-4 mt-2 mb-4"></v-divider>
  <p class="text-h6 montserrat-alternates mx-5 mb-2">Evolution sprites</p>
  <div
    class="text-subtitle-1 d-flex justify-start w100 mx-5 d-flex flex-wrap"
    v-for="(evolution, index) in info.evolutionInfo"
    :key="index"
  >
    <span class="mt-4">
      <span
        class="title"
        :class="
          evolution.name != info.currentPokemon.name ? 'cursor-pointer' : ''
        "
        @click="emitUpdate(evolution.name)"
        >{{ evolution.name }}</span
      >'s sprites:</span
    >
    <div
      class="text-subtitle-1 d-flex justify-start gap-25 w100 mx-5 d-flex flex-wrap"
    >
      <a
        v-for="(spriteUrl, index) in Object.values(evolution.sprites).filter(
          (e) => e != null
        )"
        :key="index"
        :class="
          evolution.name != info.currentPokemon.name ? 'cursor-pointer' : ''
        "
        @click="emitUpdate(evolution.name)"
      >
        <img class="book-image" :src="spriteUrl" alt="" height="130" />
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    info: {
      type: Object,
    },
  },
  methods: {
    async emitUpdate(name) {
      if (name == this.info.currentPokemon.name) return;
      await this.$router.push({ path: `/book/${name}` });
      this.$emit("update-event");
    },
  },
  computed: {
    getSprites() {
      const spritesArray = Object.values(this.info.currentPokemon.sprites);
      return spritesArray.filter((e) => e != null);
    },
    normalizedLocations() {
      const locations = [];
      this.info.regionInfo.forEach((e) => {
        const name = e.location_area.name;
        const normalized = name.replaceAll("-", " ");
        locations.push(normalized);
      });
      return locations;
    },
    normalizedForms() {
      const forms = [];
      this.info.currentPokemon.forms.forEach((e) => {
        const name = e.name;
        const normalized = name.replaceAll("-", " ");
        forms.push(normalized);
      });
      return forms;
    },
  },
};
</script>

<style lang="scss" scoped></style>
