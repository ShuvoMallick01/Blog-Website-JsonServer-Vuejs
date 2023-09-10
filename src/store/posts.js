import { defineStore } from "pinia";
import { useAuthStore } from "./auth";
import Toast from "vue-toastification";

export const usePostsStore = defineStore("posts", {
  state() {
    return {
      posts: [],
      error: null,
    };
  },

  actions: {
    async getPosts() {
      const response = await fetch("http://localhost:5000/posts");
      let posts = await response.json();
      this.posts = posts;
    },

    async getPost(id) {
      const response = await fetch(`http://localhost:5000/posts/${id}`);

      if (response.ok && response.status === 200) {
        return await response.json();
      } else {
        return null;
      }
    },

    async createPost(data) {
      const { user } = useAuthStore();

      const res = await fetch(`http://localhost:5000/posts`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.accessToken}`,
        },
      });

      if (res.ok && res.status === 201) {
        await res.json();
        this.error = "";
        return;
      } else {
        this.error = await res.json();
        return await res.json();
      }
    },

    async getPostsByUser() {
      const { user } = useAuthStore();

      const res = await fetch(`http://localhost:5000/posts/user`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.accessToken}`,
        },
      });

      if (res.ok && res.status === 200) {
        return await res.json();
      } else {
        return null;
      }
    },

    async editPost(id, data) {
      const { user } = useAuthStore();
      const res = await fetch(`http://localhost:5000/600/posts/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.accessToken}`,
        },
      });

      if (res.ok && res.status === 200) {
        this.error = "";
        return await res.json();
      } else {
        this.error = await res.json();
        return await res.json();
      }
    },
  },
});
