<template>
  <v-table fixed-header height="300px">
    <thead>
      <tr>
        <th class="text-left">Name</th>
        <th class="text-left">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in allBooks" :key="index">
        <td>{{ item.name }}</td>
        <td>
          <v-btn
            class="rounded-lg"
            depressed
            :to="`/pokemon`"
            width="250"
            color="#F5F5F5"
          >
            <span class="montserrat-alternates title">See all details</span>
            <svg-icon class="ml-3" size="16" type="mdi" :path="path"></svg-icon>
          </v-btn>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script>
import { mdiArrowExpandAll } from "@mdi/js";

export default {
  props: {
    allBooks: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  data: () => ({
    path: mdiArrowExpandAll,
  }),
  async created() {
    console.log("🚀 ~ file: AdminTable.vue:22 ~ allBooks:", this.allBooks);
  },
};
</script>

<style lang="scss" scoped>
.v-table {
  > .v-table__wrapper > table > tbody > tr > td {
    text-transform: capitalize;
  }
}
</style>
