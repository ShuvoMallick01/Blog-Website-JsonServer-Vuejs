<template>
  <!-- <Loading v-if="loading"></Loading> -->

  <div class="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
    <div
      class="px-5 py-4 border border-gray-300 shadow-sm rounded-xl shadow-slate-100"
      v-for="post in posts"
      :key="post.id"
    >
      <h3 class="text-lg font-medium text-slate-700 uppercase">
        <router-link :to="`/posts/${post.id}`"
          >{{ post.title.substring(0, 25)
          }}{{ post.title.length > 25 ? "..." : "" }}</router-link
        >
      </h3>

      <p class="mt-3 leading-6 text-justify text-slate-600">
        {{ post.body.substring(0, 120)
        }}{{ post.body.length > 120 ? "..." : "" }}
      </p>

      <div class="mt-4">
        <span
          class="inline-flex item-center px-2 py-1 mr-2 text-sm font-medium leading-none rounded bg-slate-700 text-slate-200"
          v-for="tag in post.tags"
          :key="tag"
          >{{ tag }}</span
        >
      </div>

      <div class="flex items-center gap-4 mt-4">
        <i class="fa-solid fa-user"></i>
        <div>
          <i class="fa-regular fa-clock me-2"></i
          ><span>{{ post.createdAt }}</span>
        </div>
      </div>

      <!-- <div
        class="inline-flex items-center gap-1 pt-1 text-sm font-medium text-slate-800"
      >
        {{
          new Date(post.createAt).tolocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
          })
        }}
      </div> -->
      <!-- {{ getPosts() }} {{ posts }} -->
    </div>
  </div>
</template>

<script>
import Loading from "../components/Loading.vue";
import { mapActions, mapState } from "pinia";
import { usePostsStore } from "../store/posts";

export default {
  components: { Loading },

  data() {
    return {
      loading: false,
    };
  },

  async mounted() {
    try {
      await this.getPosts();
    } catch (e) {
      console.log(e);
    }
  },

  computed: {
    ...mapState(usePostsStore, ["posts"]),
  },

  methods: {
    ...mapActions(usePostsStore, ["getPosts"]),
  },
};
</script>
