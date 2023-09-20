<template>
  <Loading v-if="loading"></Loading>

  <div class="border p-5" v-else>
    <h1 class="text-2xl font-semibold text-slate-700 uppercase">
      <span class="">Post No: {{ post.id }} | {{ post.title }}</span>
    </h1>

    <ul class="mt-5">
      {{
        post.body
      }}
    </ul>
  </div>

  <div class="flex justify-between mt-5">
    <button
      class="bg-slate-200 text-slate-600 font-medium py-2 px-4 rounded-lg"
      @click="handlePrevious()"
    >
      Previous
    </button>

    <button
      class="bg-slate-200 text-slate-600 font-medium py-2 px-4 rounded-lg"
      @click="handleNext()"
    >
      Next
    </button>
  </div>
</template>

<!-- FUNCTIONALITY -->
<script setup>
import { ref } from "vue";
import { mapActions, mapState } from "pinia";
import { useRouter } from "vue-router";
import { usePostsStore } from "../stores/PostsStore";
import Loading from "../components/Loading.vue";

const router = useRouter();
const store = usePostsStore();

// State
const post = ref(null);
const loading = ref(true);
const id = ref(null);

// onBeforeRouteEnter(async (to, from, next) => {
//   try {
//     loading.value = true;
//     let data = await store.getPost(to.params.id);

//     if (data) {
//       post.value = data;
//       loading.value = false;
//     } else {
//       router.replace("/");
//     }
//   } catch (error) {
//     console.error(error);
//     // router.replace("/");
//   }

//   next();
// });

// onBeforeRouteUpdate= async(to, from) => {
//   this.loading = true;
//   let post = await this.getPost(to.params.id);
//   if (post) {
//     this.post = post;
//   } else {
//     this.$router.replace("/");
//   }
//   this.loading = false;
// }

const handleNext = () => {
  // if (this.posts.length > this.post.id) {
  //   this.$router.push("/posts/" + (+this.post.id + 1));
  // } else {
  //   this.$router.replace("/");
  // }

  router.push("/posts/" + (+post.value.id + 1));
};

const handlePrevious = () => {
  // if (this.id > 1) {
  //   this.$router.push("/posts/" + (+this.post.id - 1));
  // } else {
  //   this.$router.replace("/posts");
  // }

  router.push("/posts/" + (+post.value - 1));
};
</script>
