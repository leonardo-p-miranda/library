import { defineStore } from "pinia";
import axios from "axios";

export const usePokemonStore = defineStore("pokemon", {
  state: () => ({
    currentPokemon: {},
    evolutions: [],
  }),
  getters: {
    currentPokemonName(state) {
      return state.currentPokemon.name;
    },
  },
  actions: {
    addPokemon(pokemon) {
      this.currentPokemon = pokemon;
    },
    async getPokemon(pokemonName) {
      try {
        const { data } = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
        );

        this.currentPokemon = data;
      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.error(`Pokemon "${pokemonName}" not found.`);
          this.currentPokemon = {};
        } else {
          throw error;
        }
      }
    },
    async getEvolutionChain(pokemonName) {
      const evolutionChainUrl = this.currentPokemon?.species.url;

      const evolutionResponse = await axios.get(evolutionChainUrl);
      const evolutionData = evolutionResponse.data;
      const evolutionChain = evolutionData.evolution_chain.url;

      const finalResponse = await axios.get(evolutionChain);
      const finalData = finalResponse.data;

      const evolutionDetails = finalData.chain;
      let evolutions = [];

      const getEvolutions = async (currentPokemon) => {
        const pokemonResponse = await axios.get(currentPokemon.species.url);
        const pokemonData = pokemonResponse.data;

        if (pokemonData.name !== pokemonName) {
          const pokemon = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${pokemonData.name}`
          );
          evolutions.push(pokemon.data);
        } else {
          evolutions.push(this.currentPokemon);
        }

        for (const evolvesTo of currentPokemon.evolves_to) {
          await getEvolutions(evolvesTo);
        }
      };

      await getEvolutions(evolutionDetails);

      this.evolutions = evolutions;
    },
  },
});
