<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
// import http from "./services/HttpService";
import axios from "axios";

export default {
  name: "App",

  data: () => ({
    //
  }),
  created() {
    // http.get("pokemon/ditto");
    axios.get("https://pokeapi.co/api/v2/pokemon/ditto");
  },
};
</script>
