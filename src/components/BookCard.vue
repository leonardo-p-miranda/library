<template>
  <v-card
    :elevation="elevated ? 12 : 1"
    height="250"
    width="200"
    @click.stop="dialog = true"
    :disabled="disabled || loading"
    :class="[
      'book-card d-flex flex-column rounded-xl justify-center',
      info.types[0].type.name,
    ]"
  >
    <v-progress-linear
      color="deep-purple"
      height="10"
      indeterminate
      v-if="loading"
    ></v-progress-linear>
    <v-card-text class="pb-0 d-flex justify-space-between">
      <span
        class="text-subtitle-1 mt-1 title text--primary mt-0 montserrat-alternates"
      >
        {{ info.name }}
      </span>
      <span class="text-h6 title text--primary mt-0 montserrat-alternates">
        <span class="text-caption montserrat-alternates" style="font-size: 10px"
          >Uts.</span
        >{{ info.base_experience }}
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
      <img
        class="book-image"
        :src="require('../assets/book.png')"
        alt=""
        height="150"
      />
    </v-card-text>
  </v-card>
  <v-dialog scrollable v-model="dialog" width="500">
    <book-modal-card :info="info" :image="image"></book-modal-card>
  </v-dialog>
</template>

<script>
import BookModalCard from "./BookModalCard.vue";
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
    disabled: {
      type: Boolean,
    },
    loading: {
      type: Boolean,
    },
    elevated: {
      type: Boolean,
    },
  },
  components: {
    BookModalCard,
  },
  data: () => ({
    dialog: false,
  }),
  methods: {
    getIcon(icon) {
      return require(`@/assets/icons/${icon}.svg`);
    },
  },
};
</script>

<style lang="scss" scoped>
.book-card {
  .book-image {
    object-fit: contain;
  }
}
</style>
