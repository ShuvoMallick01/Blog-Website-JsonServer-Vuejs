import { ref } from "vue";
import { defineStore } from "pinia";
import { useAuthStore } from "./AuthStore";
import Toast from "vue-toastification";

export const usePostsStore = defineStore("postsStore", () => {
  const posts = ref([]);
  const error = ref(null);

  const getPosts = async () => {
    const response = await fetch("http://localhost:5000/posts");
    let data = await response.json();
    posts.value = [...data];
  };

  const getPost = async (id) => {
    const response = await fetch(`http://localhost:5000/posts/${id}`);

    if (response.ok && response.status === 200) {
      return await response.json();
    } else {
      return null;
    }
  };

  const createPost = async (data) => {
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
      error.value = "";
      return;
    } else {
      error.value = await res.json();
      return await res.json();
    }
  };

  const getPostsByUser = async () => {
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
  };

  const editPost = async (id, data) => {
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
      error.value = "";
      return await res.json();
    } else {
      error.value = await res.json();
      return await res.json();
    }
  };

  const deletePost = async (id) => {
    const { user } = useAuthStore();

    const res = await fetch(`http://localhost:5000/600/posts/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });

    if (res.ok && res.status === 200) {
      error.value = "";
      return await res.json();
    } else {
      error.value = await res.json();
      return await res.json();
    }
  };

  const filterPost = async (searchInput) => {
    const { user } = useAuthStore();
    console.log(searchInput);

    const res = await fetch(
      `http://localhost:5000/posts?title_like=${searchInput}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.accessToken}`,
        },
      }
    );

    // console.log(await res.json());
    // return await res.json();

    if (res.ok && res.status === 200) {
      error.value = "";
      return await res.json();
    } else {
      error.value = await res.json();
      return await res.json();
    }
  };

  return {
    posts,
    error,
    getPosts,
    getPost,
    createPost,
    getPostsByUser,
    editPost,
    deletePost,
    filterPost,
  };
});
