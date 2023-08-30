<template>
  <v-app :class="darkMode ? 'dark-mode' : ''">
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { usePokemonStore } from "@/store/usePokemonStore";
import { mapWritableState } from "pinia";
export default {
  name: "App",
  computed: {
    ...mapWritableState(usePokemonStore, ["darkMode"]),
  },
};
</script>
