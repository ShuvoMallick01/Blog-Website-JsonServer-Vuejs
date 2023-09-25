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
import { onMounted, ref, watch } from "vue";
import { mapActions, mapState } from "pinia";
import { useRouter, useRoute, onBeforeRouteUpdate } from "vue-router";
import { usePostsStore } from "../stores/PostsStore";
import Loading from "../components/Loading.vue";

const router = useRouter();
const route = useRoute();
const store = usePostsStore();

// State
let post = ref(null);
let loading = ref(true);
let id = ref(null);

// Methods
onMounted(async () => {
  loading.value = true;
  let data = await store.getPost(route.params.id);

  if (data) {
    post.value = data;
  } else {
    router.replace("/");
  }

  loading.value = false;
});

onBeforeRouteUpdate(async (to, from) => {
  let data = await store.getPost(to.params.id);

  if (data) {
    post.value = data;
  } else {
    router.replace("/");
  }
  loading.value = false;
});

// Previous
const handlePrevious = () => {
  if (route.params.id > 1) {
    router.push("/posts/" + (+post.value.id - 1));
  } else {
    router.replace("/");
  }
};

// Next
const handleNext = () => {
  if (store.posts.length > post.value.id) {
    router.push("/posts/" + (+post.value.id + 1));
  } else {
    router.replace("/");
  }
};
</script>
