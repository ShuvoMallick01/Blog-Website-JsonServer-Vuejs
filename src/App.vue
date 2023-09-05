<template>
  <Layout>
    <router-view />

    <router-view name="sidebar" />
  </Layout>
</template>

<!-- FUNCTIONALITY -->
<script>
import Layout from "./components/Layout.vue";

export default {
  components: {
    Layout,
  },
};
</script>
