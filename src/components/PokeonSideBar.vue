<template>
  <p class="text-h4 text--primary">{{ name }}</p>
  <p class="text-h6">{{ type }}</p>

  <img :src="image" alt="" />
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped></style>
