<template>
  <ul class="mt-5 flex flex-col space-y-3"></ul>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <div
      class="border py-4 px-5 shadow-sm rounded-xl"
      v-for="post in postList"
      :key="post.id"
    >
      <router-link :to="'/posts/' + post.id">
        <h3 class="text-slate-600 text-xl uppercase font-semibold mb-2">
          {{ post.title.substring(0, 25) }}
          {{ post.title.length > 25 ? "..." : "" }}
        </h3>
        <p class="text text-sm">
          {{ post.body.substring(0, 150) }}
        </p>
      </router-link>
    </div>
  </div>
</template>

<script>
// import postList from "../data/posts";
// import { posts } from "../data/posts";

export default {
  data() {
    return {
      // postList: [...posts],
      // postList,
    };
  },
};
</script>
