<template>
  <v-card class="mx-auto my-12" :max-width="small ? '200' : '354'">
    <v-img
      height="250"
      :src="pokemon.sprites.front_default"
      :class="pokemon.types[0].type.name"
    ></v-img>

    <v-card-title class="title montserrat-alternates">{{
      pokemon.name
    }}</v-card-title>

    <v-card-text>
      <div class="text-subtitle-1 d-flex justify-space-between">
        <span class="title"> Weight</span>
        <span class="title"> {{ pokemon.weight }} lbs</span>
      </div>
      <div class="text-subtitle-1 d-flex justify-space-between">
        <span class="title"> Height</span>
        <span class="title"> {{ pokemon.height }} ft</span>
      </div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-text>
      <p class="text-subtitle-1 title montserrat-alternates">Abilities</p>
      <div
        v-for="ability in pokemon.abilities"
        :key="ability.name"
        class="text-subtitle-1 d-flex justify-space-between"
      >
        <span class="title"> {{ ability.ability.name }}</span>
      </div>
    </v-card-text>
    <v-divider class="mx-4"></v-divider>
  </v-card>
</template>

<script>
export default {
  props: {
    pokemon: {
      type: Object,
      required: true,
    },
    small: {
      type: Boolean,
    },
  },
};
</script>

<style lang="scss" scoped></style>
