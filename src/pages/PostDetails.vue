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
<script>
import { mapActions, mapState } from "pinia";
import { usePostsStore } from "../stores/PostsStore";
import Loading from "../components/Loading.vue";

export default {
  // props: ["id"],
  components: { Loading },

  data() {
    return {
      post: null,
      loading: true,
      id: null,
    };
  },

  beforeRouteEnter(to, from, next) {
    next(async (vm) => {
      vm.loading = true;
      let post = await vm.getPost(to.params.id);

      if (post) {
        vm.post = post;
      } else {
        vm.$router.replace("/");
      }
      console.log(to.params.id, vm.post);
      vm.loading = false;
    });
  },

  async beforeRouteUpdate(to, from) {
    this.loading = true;
    let post = await this.getPost(to.params.id);
    if (post) {
      this.post = post;
    } else {
      this.$router.replace("/");
    }
    this.loading = false;
  },

  methods: {
    ...mapActions(usePostsStore, ["getPost"]),

    handleNext() {
      // if (this.posts.length > this.post.id) {
      //   this.$router.push("/posts/" + (+this.post.id + 1));
      // } else {
      //   this.$router.replace("/");
      // }

      this.$router.push("/posts/" + (+this.post.id + 1));
    },

    handlePrevious() {
      // if (this.id > 1) {
      //   this.$router.push("/posts/" + (+this.post.id - 1));
      // } else {
      //   this.$router.replace("/posts");
      // }

      this.$router.push("/posts/" + (+this.post.id - 1));
    },
  },
};
</script>
