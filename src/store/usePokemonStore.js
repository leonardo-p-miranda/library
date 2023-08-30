import { defineStore } from "pinia";
import axios from "axios";

export const usePokemonStore = defineStore("book", {
  state: () => ({
    currentPokemon: {},
    evolutions: [],
    regionInfo: [],
    speciesInfo: {},
    darkMode: true,
  }),
  getters: {
    currentPokemonName(state) {
      return state.currentPokemon.name;
    },
    allPokemonInfos() {
      return {
        currentPokemon: this.currentPokemon,
        evolutionInfo: this.evolutions,
        regionInfo: this.regionInfo,
        speciesInfo: this.speciesInfo,
      };
    },
  },
  actions: {
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
        }
        throw error;
      }
    },
    async getEvolutionChain(pokemonName) {
      try {
        const evolutionChainUrl = this.currentPokemon?.species.url;

        const evolutionResponse = await axios.get(evolutionChainUrl);
        const evolutionData = evolutionResponse.data;
        const evolutionChain = evolutionData.evolution_chain.url;

        const finalResponse = await axios.get(evolutionChain);
        const finalData = finalResponse.data;

        const evolutionDetails = finalData.chain;
        let evolutions = [];

        const getEvolutions = async (currentPokemon) => {
          try {
            const pokemonResponse = await axios.get(currentPokemon.species.url);
            const pokemonData = pokemonResponse.data;

            if (pokemonData.name !== pokemonName) {
              const book = await axios.get(
                `https://pokeapi.co/api/v2/pokemon/${pokemonData.name}`
              );
              evolutions.push(book.data);
            } else {
              evolutions.push({ ...this.currentPokemon, selected: true });
            }

            for (const evolvesTo of currentPokemon.evolves_to) {
              await getEvolutions(evolvesTo);
            }
          } catch (error) {
            console.error(error);
          }
        };

        await getEvolutions(evolutionDetails);

        this.evolutions = evolutions;
      } catch (error) {
        console.error(error);
      }
    },
    async getRegionInfo() {
      const regionRequestUrl = this.currentPokemon.location_area_encounters;
      try {
        const { data } = await axios.get(regionRequestUrl);
        this.regionInfo = data;
      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.error(`Region not found.`);
          this.regionInfo = [];
        } else {
          throw error;
        }
      }
    },
  },
});
