<template>
  <div>
    <v-text-field
      label="Buscar um pokemon"
      outlined
      v-model="search"
    ></v-text-field>
    <v-btn>BUSCAR</v-btn>
  </div>
</template>

<script>
export default {
  data: () => ({
    search: "",
  }),
};
</script>

<style lang="scss" scoped></style>
