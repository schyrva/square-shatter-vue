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
  padding: 1rem;
}

nav {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

nav a {
  text-decoration: none;
  color: #333;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s;
}

nav a:hover,
nav a.router-link-active {
  background-color: #f0f0f0;
}

main {
  padding-top: 60px;
  height: calc(100vh - 60px);
}
</style>
