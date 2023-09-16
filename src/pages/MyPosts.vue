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
          v-model="searchInput"
          type="search"
          id="default-search"
          class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:border-gray-400 focus:ring-0 focus:outline-none"
          placeholder="Search Mockups, Logos..."
          required
        />
      </div>
    </form>

    <!-- <Loading v-if="loading"></Loading> -->

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
        <PostTableRow
          :posts="handleFilterPost"
          :formatDate="formatDate"
          :handleDeletePost="handleDeletePost"
        ></PostTableRow>
      </tbody>
    </table>
    {{ handleFilterPost() }}
  </div>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { usePostsStore } from "../store/posts";
import { format } from "date-fns";
import PostTableRow from "../components/PostTableRow.vue";
import Loading from "../components/Loading.vue";
import { useToast } from "vue-toastification";
const toast = useToast();

export default {
  data() {
    return {
      posts: [],
      searchInput: null,
      loading: false,
      // filterPostList: [],
    };
  },

  methods: {
    async handleDeletePost(id) {
      try {
        await this.deletePost(id);
        console.log(this.error);
        if (!this.error) {
          toast.success("Successfully Post Delete!");
          this.$router.push("/");
        }
      } catch (error) {
        if (this.error) {
          toast.error("Someting Wents Wrong");
        }
      }
    },

    formatDate(date) {
      return format(new Date(date), "dd MMM yyyy");
    },

    ...mapActions(usePostsStore, [
      "getPostsByUser",
      "deletePost",
      "filterPost",
    ]),

    async handleFilterPost() {
      let filterPostList = [...this.posts];
      // console.log(filterPostList);

      try {
        // this.loading = true;
        let data = await this.filterPost(this.searchInput);
        filterPostList = [...data];
        return filterPostList;
      } catch (error) {
        console.log(error);
      } finally {
        // this.loading = false;
      }
      return filterPostList;
    },
  },

  computed: {
    ...mapState(usePostsStore, ["error", "filterPostList"]),
  },

  beforeRouteEnter(to, form, next) {
    next(async (vm) => {
      let data = await vm.getPostsByUser();
      vm.posts = data;
    });
  },

  components: {
    PostTableRow,
    Loading,
  },
};
</script>
