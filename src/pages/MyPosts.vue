<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <form class="mb-5 lg:w-1/2 mx-auto">
      <label
        for="default-search"
        class="mb-2 text-sm font-medium text-gray-900 sr-only"
        >Search</label
      >
      <div class="relative">
        <div
          class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
        >
          <svg
            class="w-4 h-4 text-gray-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:border-gray-400 focus:ring-0 focus:outline-none"
          placeholder="Search Mockups, Logos..."
          required
        />
        <!-- <button
          type="submit"
          class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Search
        </button> -->
      </div>
    </form>

    <!-- Table -->
    <table
      class="w-full text-sm text-left text-gray-500 dark:text-gray-400 overflow-x-auto"
    >
      <thead class="text-xs text-gray-700 uppercase dark:text-gray-400">
        <tr>
          <th scope="col" class="px-6 py-3 bg-gray-200 text-gray-800 font-bold">
            <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
          </th>
          <th scope="col" class="px-6 py-3 bg-gray-200 text-gray-800 font-bold">
            TITLE
          </th>
          <th scope="col" class="px-6 py-3 bg-gray-200 text-gray-800 font-bold">
            BODY
          </th>
          <th scope="col" class="px-6 py-3 bg-gray-200 text-gray-800 font-bold">
            STATUS
          </th>
          <th
            scope="col"
            class="px-6 py-3 bg-gray-200 text-gray-800 font-bold whitespace-nowrap"
          >
            CREATED AT
          </th>
          <th scope="col" class="px-6 py-3 bg-gray-200 text-gray-800 font-bold">
            ACTION
          </th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-b border-gray-200" v-for="post in posts">
          <th scope="row" class="px-6 py-4">
            <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
          </th>
          <th
            scope="row"
            class="px-6 py-4 font-medium text-gray-900 xl:whitespace-nowrap bg-gray-50"
          >
            {{ post.title }}
          </th>
          <td class="px-6 py-4 lg:w-80 xl:w-1/3 text-gray-900">
            {{ post.body.substring(0, 100) }}
            {{ post.body.length > 100 ? "..." : "" }}
          </td>
          <td class="px-6 py-4 bg-gray-50 text-gray-900 xl:w-52">
            {{ post.published ? "Published" : "Draft" }}
          </td>
          <td class="px-6 py-4 text-gray-900 xl:w-52">{{ post.createdBy }}</td>
          <td
            class="px-6 py-4 bg-gray-50 text-gray-900 whitespace-nowrap xl:w-52"
          >
            <a href="#">Edit</a> <a href="#">Delete</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapActions } from "pinia";
import { usePostsStore } from "../store/posts";
// import postList from "../data/posts";
// import { posts } from "../data/posts";

export default {
  data() {
    return {
      posts: [],
    };
  },

  methods: {
    ...mapActions(usePostsStore, ["getPostsByUser"]),
  },

  beforeRouteEnter(to, form, next) {
    next(async (vm) => {
      let data = await vm.getPostsByUser();
      vm.posts = data;
    });
  },
};
</script>
