<template>
  <Layout>
    <router-view />
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
