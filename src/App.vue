<script setup lang="ts"></script>

<template>
  <header>
    <nav>
      <router-link to="/">Animation</router-link>
      <router-link to="/landing">Landing</router-link>
      <router-link to="/catalog">Catalog</router-link>
    </nav>
  </header>

  <main>
    <router-view />
  </main>
</template>

<style scoped>
header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.9);
  z-index: 100;
  padding: 0.5rem 1rem;
  box-sizing: border-box;
}

nav {
  display: flex;
  gap: clamp(0.3rem, 2vw, 1rem);
  justify-content: center;
  flex-wrap: wrap;
}

nav a {
  text-decoration: none;
  color: #333;
  font-weight: 500;
  padding: 0.5rem clamp(0.5rem, 2vw, 1rem);
  border-radius: 4px;
  transition: background-color 0.3s;
  font-size: clamp(0.8rem, 2vw, 1rem);
  white-space: nowrap;
}

nav a:hover,
nav a.router-link-active {
  background-color: #f0f0f0;
}

main {
  padding-top: 60px;
  height: calc(100vh - 60px);
  width: 100%;
  overflow: hidden;
  box-sizing: border-box;
}
</style>

<style>
html,
body {
  margin: 0;
  padding: 0;
  overflow: hidden;
  height: 100%;
  width: 100%;
}

#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
