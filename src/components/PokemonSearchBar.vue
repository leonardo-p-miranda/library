<template>
  <div>
    <v-text-field
      label="Buscar um pokemon"
      outlined
      v-model="search"
    ></v-text-field>
    <v-btn @click="emitSearch()">BUSCAR</v-btn>
  </div>
</template>

<script>
export default {
  data: () => ({
    search: "",
  }),
  methods: {
    emitSearch() {
      this.$emit("search-event", this.search);
    },
  },
};
</script>

<style lang="scss" scoped></style>
