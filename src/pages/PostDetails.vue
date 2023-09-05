<template>
  <button
    class="bg-slate-200 text-slate-600 font-medium py-2 px-4 rounded-lg mb-5"
    @click="$router.push({ path: '/', replace: true })"
  >
    Go Back
  </button>

  <div v-if="post" class="border p-4">
    <h1 class="text-2xl font-semibold text-slate-700 uppercase mt-5">
      <span class="">Post No: {{ id }} | {{ post.title }}</span>
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

    <!-- <button
      class="bg-slate-200 text-slate-600 font-medium py-2 px-4 rounded-lg"
      @click="$router.back()"
    >
      Next
    </button> -->
  </div>
</template>

<!-- FUNCTIONALITY -->
<script>
// import { posts } from "../data/posts";

export default {
  // props: ["id"],
  // data() {
  //   return {
  //     post: null,
  //     postList: [...posts],
  //   };
  // },

  props: ["id"],

  methods: {
    handleNext() {
      if (this.postList.length > this.id) {
        this.$router.push("/posts/" + (+this.id + 1));
      } else {
        this.$router.replace("/posts");
      }
    },

    handlePrevious() {
      if (this.id > 1) {
        this.$router.push("/posts/" + (+this.id - 1));
      } else {
        this.$router.replace("/posts");
      }
    },
  },

  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.post = vm.postList.find((item) => item.id === +to.params.id);
    });
  },

  beforeRouteUpdate(to, from) {
    this.post = this.postList.find((item) => item.id === +to.params.id);
  },

  beforeRouteLeave(to, from) {
    // this.post = this.postList.find((item) => item.id === +this.id);
  },

  // watch: {
  //   id: {
  //     handler: function (newId) {
  //       const post = this.postList.find((post) => post.id === +newId);
  //       this.post = post;
  //       console.log(+newId);
  //     },
  //     immediate: true,
  //   },
  // },
};
</script>
