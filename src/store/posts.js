import { defineStore } from "pinia";

export const usePostsStore = defineStore("posts", {
  state() {
    return {
      posts: [],
    };
  },

  actions: {
    async getPosts() {
      const response = await fetch("http://localhost:8000/posts");
      let posts = await response.json();
      this.posts = posts;
    },
  },
});
