<script setup>
import { RouterLink, RouterView } from "vue-router";
import groups from "./assets/data.json";
</script>

<template>
  <header>
    <h1>Sigue Qatar 2022</h1>
  </header>
  <div class="safe-view">
    <RouterView />
  </div>
  <nav>
    <RouterLink to="/">Hoy</RouterLink>
    <RouterLink
      v-for="group in groups"
      :key="group.name"
      :to="`/grupo/${group.name}`"
      >Grupo {{ group.name }}</RouterLink
    >
    <RouterLink to="/octavos">Octavos</RouterLink>
    <RouterLink to="/cuartos">Cuartos</RouterLink>
    <RouterLink to="/semifinales">Semifinales</RouterLink>
    <RouterLink to="/finales">Final & 3er y 4to puesto</RouterLink>
  </nav>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
  padding: 1rem;
  position: fixed;
  width: 100%;
  top: 0;
  background: #550065;
  color: white;
  z-index: 1;
  text-align: center;

  display: flex;
  justify-content: center;
}

.safe-view {
  height: 100vh;
  width: 100%;
  margin: 80px auto 200px auto;
  padding: 0 2rem;
  overflow: auto;
  max-width: 1280px;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100vw;
  font-size: 1rem;
  text-align: center;
  margin-top: 2rem;
  position: fixed;
  bottom: 0;
  background: #550065;

  padding: 1rem 0;
  margin-top: 1rem;
}

nav a.router-link-exact-active {
  color: white;
  font-weight: bold;
  background-color: #8c6496;
  border-radius: 3px;
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}
nav a:hover {
  font-weight: bold;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
  color: white;
  text-decoration: none;
  transition: 0.2s;
}

nav a:first-of-type {
  border: 0;
}
</style>
