import { ref } from "vue";
import { defineStore } from "pinia";
import { useAuthStore } from "./AuthStore";
import Toast from "vue-toastification";
import axios from "../utilities/axios";

export const usePostsStore = defineStore("postsStore", () => {
  const posts = ref([]);
  const error = ref(null);

  const getPosts = async () => {
    const { data } = await axios().get("/posts");
    posts.value = [...data];
  };

  const getPost = async (id) => {
    const { data } = await axios().get(`/posts/${id}`);

    if (data) {
      return data;
    } else {
      return null;
    }
  };

  const createPost = async (payload) => {
    const { userState } = useAuthStore();
    const { data } = await axios(userState.user.accessToken).post(
      "/posts",
      payload
    );
    // console.log(data);

    if (data) {
      return data;
    } else {
      return data;
    }
  };

  const getPostsByUser = async () => {
    const { userState } = useAuthStore();

    const { data } = await axios(userState.user.accessToken).get("/posts/user");

    if (data) {
      return data;
    } else {
      return null;
    }
  };

  const editPost = async (id, payload) => {
    const { userState } = useAuthStore();

    const { data } = await axios(userState.user.accessToken).patch(
      `/600/posts/${id}`,
      payload
    );

    console.log(data);
    if (data) {
      return data;
    } else {
      return data;
    }
  };

  const deletePost = async (id) => {
    const { userState } = useAuthStore();

    const { data } = await axios(userState.user.accessToken).delete(
      `/600/posts/${id}`
    );

    console.log(data);
    if (data) {
      return data;
    } else {
      return data;
    }
  };

  const filterPost = async (searchInput) => {
    const { userState } = useAuthStore();

    const { data } = await axios(userState.user.accessToken).get(
      `/posts?title_like=${searchInput}`
    );

    console.log(data);
    if (data) {
      return data;
    } else {
      return data;
    }

    // const res = await fetch(
    //   `http://localhost:5000/posts?title_like=${searchInput}`,
    //   {
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${userState.user.accessToken}`,
    //     },
    //   }
    // );

    // if (res.ok && res.status === 200) {
    //   error.value = "";
    //   return await res.json();
    // } else {
    //   error.value = await res.json();
    //   return await res.json();
    // }
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
