<script setup lang="ts">
const currentYear = new Date().getFullYear();
</script>

<template>
  <footer class="app-footer">
    <div class="footer-content">
      <span>© {{ currentYear }}</span>
      <a
        href="https://www.linkedin.com/in/stanislav-chyrva-3a3b24347/"
        target="_blank"
        rel="noopener noreferrer"
        class="author-link"
      >
        Stanislav Chyrva
      </a>
    </div>
  </footer>
</template>

