<template>
  <v-card
    elevation="5"
    class="rounded-xl mx-auto my-12"
    :max-width="small ? '200' : '354'"
  >
    <v-img
      height="250"
      :src="require('../assets/book.png')"
      :class="book.types[0].type.name"
    ></v-img>

    <v-card-title
      class="mt-2 title montserrat-alternates d-flex justify-start align-center"
      >{{ book.name }}
      <div
        v-for="(pokeType, index) in book.types"
        :key="index"
        class="d-flex justify-start gap-10 ml-2"
      >
        <v-img
          :src="getIcon(pokeType.type.name)"
          height="20"
          width="20"
        ></v-img>
      </div>
    </v-card-title>

    <v-card-text>
      <div class="text-subtitle-1 d-flex justify-space-between">
        <span class="title"> Unid. Disponíveis</span>
        <span> {{ book.weight / 10 }} kg</span>
      </div>
      <div class="text-subtitle-1 d-flex justify-space-between">
        <span class="title"> Prazo de Empréstimo</span>
        <span> {{ book.height / 10 }} m</span>
      </div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-text>
      <p class="text-subtitle-1 title montserrat-alternates">Abilities</p>
      <div
        v-for="ability in book.abilities"
        :key="ability.name"
        class="text-subtitle-1 d-flex justify-space-between"
      >
        <span class="title">
          {{ ability.ability.name.replaceAll("-", " ") }}</span
        >
      </div>
    </v-card-text>

    <div class="details-actions">
      <v-btn rounded color="#0a0a0c" :class="`my-4 mb-6 button`"
        >Fazer Empréstimo</v-btn
      >
      <v-btn rounded color="#0a0a0c" :class="`my-2 mb-6 button`"
        >Vincular a Turma</v-btn
      >
    </div>
  </v-card>
</template>

<script>
export default {
  props: {
    book: {
      type: Object,
      required: true,
    },
    small: {
      type: Boolean,
    },
  },
  methods: {
    getIcon(icon) {
      return require(`@/assets/icons/${icon}.svg`);
    },
  },
};
</script>

<style lang="scss" scoped>
.details-actions {
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;

  > .button {
    color: #ffffff;
    text-transform: initial;
    font-weight: 500;
    width: 250px;
  }
}
</style>
