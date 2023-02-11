# Pokedex 🎮

A Pokedex application built with Vue.js, Pinia, and Axios, designed to help Pokemon fans learn more about their favorite Pokemon. This repository contains the source code for the app. The data for the Pokemon is fetched from pokeapi.co.

## ⚡️ Features

- Browse through a list of Pokemon and see their sprites, names, XP, and basic stats. 🔎
- Search for a specific Pokemon by name or number. 🔍
- View the basic stats of a Pokemon when clicking on its card. 📊

## 🚀 Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### ⚙️ Prerequisites

Before you can run this project, you will need to have the following software installed and configured on your computer:

- Node.js and npm
- Vue CLI
- Basic understanding of Vue.js and its concepts
- Familiarity with npm and package management in JavaScript
- Basic understanding of state management in Vue.js using Pinia

### 📦 Installing

Clone this repository to your local machine using the following command:

```
git clone https://github.com/ChrystianMSC/Pokedex.git

```
Change to the project directory:
    
```
cd Pokedex
```
Install the required dependencies:

```
npm install
```
Start the development server:

```
npm run serve
```

## 💻 Code Details

This application is built with Vue.js and uses Axios for data fetching, Pinia for state management, and Vuetify for UI components.

The main components of the application are stored in the ***src*** folder and include:

- ***components***: This folder contains the Vue components used in the application, including:
  - ***PokemonCard.vue***: Displays a card for each Pokemon that contains basic information about the Pokemon such as their sprite, name, XP, and stats. When clicked, the ***PokemonModalCard*** component is displayed.
  - ***PokemonModalCard.vue***: Displays the basic stats of a Pokemon when clicked on its ==PokemonCard==.
  - ***PokemonSearchBar.vue***: Allows the user to search for a specific Pokemon by name or number.

- ***views***: This folder contains the main view of the application, which is PokemonsView.vue. This view contains the PokemonCard and PokemonSearchBar components.

The data for the Pokemon is fetched from pokeapi.co using Axios and managed using Pinia.

## 🔧 Built With

**Vue.js** - A progressive JavaScript framework for building user interfaces (Vue 3).

**Pinia** - A small and highly customizable state management solution for Vue.js.

**Axios** - A JavaScript library for making HTTP requests.

**Vuetify**  - A Material Design component framework for Vue.js.

**Vuerouters** - the official router for Vue. js.

**Sass** - Sass is a CSS pre-processor.
