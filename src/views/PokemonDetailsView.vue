<template>
  <pokemon-details-card :pokemon="pokemon"></pokemon-details-card>
  <pokemon-details-card small :pokemon="pokemon"></pokemon-details-card>
</template>

<script>
import { usePokemonStore } from "@/store/usePokemonStore";
import { mapWritableState } from "pinia";
import PokemonDetailsCard from "../components/PokemonDetailsCard.vue";

export default {
  components: { PokemonDetailsCard },
  data: () => ({
    pokemon: {},
    usePokemon: usePokemonStore(),
  }),
  computed: {
    ...mapWritableState(usePokemonStore, ["currentPokemon"]),
  },
  async created() {
    await this.getPokemonData();
  },
  methods: {
    async getPokemonData() {
      const { id } = this.$route.params;
      if (id == this.currentPokemon.name) {
        this.pokemon = this.currentPokemon;
        return;
      }
      const fixedName = id.replace(" ", "-");
      await this.usePokemon.getPokemon(fixedName);
      await this.usePokemon.getEvolutionChain(fixedName);
      this.pokemon = this.currentPokemon;
      console.log(
        "🚀 ~ file: PokemonDetailsView.vue:58 ~ getPokemonData ~ pokemon",
        { ...this.pokemon }
      );
    },
  },
};
</script>
