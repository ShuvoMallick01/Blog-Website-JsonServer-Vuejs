<template>
  <!-- Navbar -->
  <Header></Header>

  <!-- Main Contents -->
  <main class="px-4 py-8">
    <div class="container mx-auto">
      <slot></slot>
    </div>
  </main>

  <!-- Footer -->
  <Footer />
</template>

<!-- FUNCTIONALITY -->
<script setup>
import Header from "./Header.vue";
import Footer from "./Footer.vue";
</script>
